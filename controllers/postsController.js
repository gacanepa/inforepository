import Post from '../models/Post.js';
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import { PLEASE_PROVIDE_ALL_VALUES } from './constants.js'
import handleNullUndefined from '../utilities/handleNullUndefined.js';

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
  const posts = await Post.find(userSearchFilter);
  res.status(OK).json({
    posts,
    totalPosts: posts.length,
    numOfPages: 1,
  });
};

const updatePost = async (_req, res) => {
  res.status(OK).send('updatePost');
};

const showStats = async (_req, res) => {
  res.status(OK).send('showStats');
};

export { createPost, deletePost, getPost, getAllPosts, updatePost, showStats };