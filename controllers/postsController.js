import Post from '../models/Post.js';
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import {
  PLEASE_PROVIDE_ALL_VALUES,
  NO_POST_FOUND,
  POST_REMOVED
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

const getAllPosts = async (req, res) => {
  const user = await User.findById(handleNullUndefined(req.user.userId));
  const userSearchFilter = user.isSuperUser
    ? {}
    : { createdBy: handleNullUndefined(req.user.userId) }

  // Instead of returning the user's ObjectId, populate the response with the first and last names
  const posts = await Post.find({
    ...userSearchFilter,
    isDeleted: false,
  }).populate('createdBy', 'firstName lastName');

  res.status(OK).json({
    posts,
    totalPosts: posts.length,
    numOfPages: 1,
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
    { $group: { _id: '$importance', count: { $sum: 1 }}},
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

  const monthlyPosts = [];

  res.status(OK).json({ defaultStats, monthlyPosts });
};

export { createPost, deletePost, getPost, getAllPosts, updatePost, showStats };