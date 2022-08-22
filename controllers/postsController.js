import { StatusCodes } from 'http-status-codes';

// Get status codes
const { OK } = StatusCodes;

const createPost = async (_req, res) => {
  res.status(OK).send('createPost');
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