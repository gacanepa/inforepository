import express from 'express';
import {
  createDoc,
  deleteDoc,
  getDoc,
  getAllDocs,
  updateDoc,
  showStats
} from '../controllers/docsController.js';

const docsRouter = express.Router();

docsRouter.route('/')
  .post(createDoc) // Create a new document if it's a POST request, or
  .get(getAllDocs); // return all documents if it's a GET request

docsRouter.route('/stats')
  .get(showStats);

docsRouter.route('/:id')
  .get(getDoc)
  .delete(deleteDoc)
  .patch(updateDoc);

export default docsRouter;
