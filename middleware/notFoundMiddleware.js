import { StatusCodes } from 'http-status-codes';
import { SOMETHING_WENT_WRONG } from './constants.js';

const { NOT_FOUND } = StatusCodes;

const notFoundMiddleware = (_req, res) => {
  // Respond with a generic message to avoid revealing too much details
  res.status(NOT_FOUND).send({ message: SOMETHING_WENT_WRONG });
};

export default notFoundMiddleware;
