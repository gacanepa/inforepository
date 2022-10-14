import Post from '../models/Post.js';
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import { PLEASE_PROVIDE_ALL_VALUES, NO_POST_FOUND } from './constants.js'
import handleNullUndefined from '../utilities/handleNullUndefined.js';
import checkPermissions from '../utilities/checkPermissions.js';

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

const deletePost = async (_req, res) => {
  res.status(OK).send('deletePost');
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
    isDeleted,
  } = req.body;

  if (!title || !content) {
    throw new BadRequestError(PLEASE_PROVIDE_ALL_VALUES);
  }

  const existingPost = await Post.findOne({ _id: String(postId) });

  if (!existingPost) {
    throw new NotFoundError(`${NO_POST_FOUND} ${postId}`);
  }

  checkPermissions({
    userId,
    resourceUserId: existingPost.createdBy,
  });

  existingPost.title = handleNullUndefined(title);
  existingPost.content = handleNullUndefined(content);
  existingPost.importance = handleNullUndefined(importance);
  existingPost.classification = handleNullUndefined(classification);
  existingPost.type = handleNullUndefined(type);
  existingPost.dueDate = handleNullUndefined(dueDate);

  // Sanitize boolean input (just in case)
  existingPost.isDeleted = Boolean(isDeleted);

  await existingPost.save();

  res.status(OK).json({ updatedPost: existingPost });
};

const showStats = async (_req, res) => {
  res.status(OK).send('showStats');
};

export { createPost, deletePost, getPost, getAllPosts, updatePost, showStats };