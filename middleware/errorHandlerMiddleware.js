import { StatusCodes } from 'http-status-codes';
import { SOMETHING_WENT_WRONG, VALIDATION_ERROR } from './constants.js';

const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;

// Error-handling functions have four arguments instead of three
// req and next are not used in this middleware for the time being
const errorHandlerMiddleware = (err, _req, res, _next) => {
  const defaultError = {
    statusCode: INTERNAL_SERVER_ERROR,
    message: SOMETHING_WENT_WRONG,
  }

  if (err.name === VALIDATION_ERROR) {
    defaultError.statusCode = BAD_REQUEST;
    defaultError.message = err.message;
  }

  res.status(defaultError.statusCode).json({
    message: err.message || defaultError.message,
  });
};

export default errorHandlerMiddleware;
