import Post from '../models/Post.js';
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import {
  PLEASE_PROVIDE_ALL_VALUES,
  NO_POST_FOUND,
  POST_REMOVED,
  ALL,
  IMPORTANCE_QUERY_FILTER,
  TYPE_QUERY_FILTER,
  CLASSIFICATION_QUERY_FILTER,
  OLDEST,
  LATEST,
} from './constants.js'
import handleNullUndefined from '../utilities/handleNullUndefined.js';
import checkPermissions from '../utilities/checkPermissions.js';
import { CRITICAL, HIGH, LOW, MEDIUM } from '../models/constants.js';

// Get status codes
const { OK, CREATED } = StatusCodes;

const createPost = async (req, res) => {
  const {
    title,
    content,
    importance,
    classification,
    type,
    dueDate
  } = req.body;

  if (!title || !content) {
    throw new BadRequestError(PLEASE_PROVIDE_ALL_VALUES);
  }

  const createdBy = req.user.userId;
  const post = await Post.create({
    title: handleNullUndefined(title),
    content: handleNullUndefined(content),
    importance: handleNullUndefined(importance),
    classification: handleNullUndefined(classification),
    type: handleNullUndefined(type),
    dueDate: handleNullUndefined(dueDate),
    createdBy: handleNullUndefined(createdBy),
  });

  res.status(CREATED).json({ post });
};

// Hard and soft delete
const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const { user: { userId }, body: { hardDelete } } = req;

  const existingPost = await Post.findOne({ _id: handleNullUndefined(postId) });

  if (!existingPost) {
    throw new NotFoundError(`${NO_POST_FOUND} ${postId}`);
  }

  await checkPermissions({
    userId,
    resourceUserId: existingPost.createdBy,
  });

  if (hardDelete) {
    await existingPost.remove();
    return;
  }

  existingPost.isDeleted = true;

  existingPost.save();

  res.status(OK).json({ message: POST_REMOVED });
};

const getPost = async (_req, res) => {
  res.status(OK).send('getPost');
};

const queryFilter = ({ filter, filterValue }) => {
  if ([ALL, undefined].includes(filterValue)) return {};
  return {
    [filter]: filterValue
  };
};

const getSortCriteria = ({ sortCriteria }) => {
  if (!sortCriteria || sortCriteria === OLDEST) return 'updatedAt';
  if (sortCriteria === LATEST) return '-updatedAt';
};

const getAllPosts = async (req, res) => {
  const {
    importance,
    classification,
    type,
    search,
    sort,
    page,
    limit,
  } = req.query;
  const user = await User.findById(handleNullUndefined(req.user.userId)).select('+isSuperUser');

  const sortCriteria = handleNullUndefined(sort);

  const userFilter = user.isSuperUser
    ? {}
    : { createdBy: handleNullUndefined(req.user.userId) }

  const importanceFilter = queryFilter({
    filter: IMPORTANCE_QUERY_FILTER,
    filterValue: handleNullUndefined(importance),
  });

  const typeFilter = queryFilter({
    filter: TYPE_QUERY_FILTER,
    filterValue: handleNullUndefined(type),
  });

  const classificationFilter = queryFilter({
    filter: CLASSIFICATION_QUERY_FILTER,
    filterValue: handleNullUndefined(classification),
  });

  // Case insensitive
  const searchFilter = search
    ? {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    }
    : {}

  const pageNumber = typeof Number(page) === 'number' ? Number(page) : 1;
  const limitNumber = typeof Number(limit) === 'number' ? Number(limit) : 10;

  const skip = (pageNumber - 1) * limitNumber;

  // Search filter without skip and limit
  const combinedFilter = {
    ...userFilter,
    ...importanceFilter,
    ...typeFilter,
    ...classificationFilter,
    ...searchFilter,
    isDeleted: false,
  };

  // Instead of returning the user's ObjectId, populate the response with the first and last names
  const posts = await Post.find({
    ...combinedFilter,
  }).populate('createdBy', 'firstName lastName')
    .sort(getSortCriteria({ sortCriteria }))
    .skip(skip)
    .limit(limitNumber);

  const totalPosts = await Post.countDocuments({
    ...combinedFilter,
  });

  const numOfPages = Math.ceil(totalPosts / limitNumber);

  res.status(OK).json({
    posts,
    totalPosts,
    numOfPages,
  });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { user: { userId } } = req;
  const {
    title,
    content,
    importance,
    classification,
    type,
    dueDate,
  } = req.body;

  if (!title || !content) {
    throw new BadRequestError(PLEASE_PROVIDE_ALL_VALUES);
  }

  const existingPost = await Post.findOne({ _id: handleNullUndefined(postId) });

  if (!existingPost) {
    throw new NotFoundError(`${NO_POST_FOUND} ${postId}`);
  }

  await checkPermissions({
    userId,
    resourceUserId: existingPost.createdBy,
  });

  existingPost.title = handleNullUndefined(title);
  existingPost.content = handleNullUndefined(content);
  existingPost.importance = handleNullUndefined(importance);
  existingPost.classification = handleNullUndefined(classification);
  existingPost.type = handleNullUndefined(type);
  existingPost.dueDate = handleNullUndefined(dueDate);

  await existingPost.save();

  res.status(OK).json({ updatedPost: existingPost });
};

const showStats = async (req, res) => {
  // The results of the aggregation pipeline include the posts of ALL users
  const tmpStats = await Post.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$importance', count: { $sum: 1 } } },
  ]);

  // Object with importance as key and count as value
  const stats = tmpStats.reduce((acc, stat) => {
    const { _id: importance, count } = stat;
    acc[importance] = count;
    return acc;
  }, {});

  // Add 0 to the stats object for each importance that doesn't exist
  const defaultStats = {
    [LOW]: stats[LOW] || 0,
    [MEDIUM]: stats[MEDIUM] || 0,
    [HIGH]: stats[HIGH] || 0,
    [CRITICAL]: stats[CRITICAL] || 0,
  };

  const tmpMonthlyPosts = await Post.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        }, count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 6 },
  ]);

  const monthlyPosts = tmpMonthlyPosts.map(item => {
    const { _id: { year, month } } = item;
    return {
      year,
      month,
      count: item.count,
    };
  });

  res.status(OK).json({ defaultStats, monthlyPosts });
};

export { createPost, deletePost, getPost, getAllPosts, updatePost, showStats };