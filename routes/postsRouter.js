import express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getAllPosts,
  updatePost,
  showStats
} from '../controllers/postsController.js';

const postsRouter = express.Router();

postsRouter.route('/')
  .post(createPost) // Create a new post if it's a POST request, or
  .get(getAllPosts); // return all posts if it's a GET request

postsRouter.route('/stats')
  .get(showStats);

postsRouter.route('/:id')
  .get(getPost)
  .delete(deletePost)
  .patch(updatePost);

export default postsRouter;
