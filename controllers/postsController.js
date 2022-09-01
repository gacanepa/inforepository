import Post from '../models/Post.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthorizedError } from '../errors/index.js';
import { PLEASE_PROVIDE_ALL_VALUES } from './constants.js'

// Get status codes
const { OK, CREATED } = StatusCodes;

const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new BadRequestError(PLEASE_PROVIDE_ALL_VALUES);
  }

  req.body.createdBy = req.user.userId;
  const post = await Post.create(req.body);

  res.status(CREATED).json({ post });
};

const deletePost = async (_req, res) => {
  res.status(OK).send('deletePost');
};

const getPost = async (_req, res) => {
  res.status(OK).send('getPost');
};

const getAllPosts = async (_req, res) => {
  res.status(OK).send('getAllPosts');
};

const updatePost = async (_req, res) => {
  res.status(OK).send('updatePost');
};

const showStats = async (_req, res) => {
  res.status(OK).send('showStats');
};

export { createPost, deletePost, getPost, getAllPosts, updatePost, showStats };