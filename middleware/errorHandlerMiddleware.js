import { StatusCodes } from 'http-status-codes';
import { SOMETHING_WENT_WRONG, VALIDATION_ERROR, DUPLICATE_KEY_ERROR } from './constants.js';
import capitalizeFieldName from '../utilities/capitalizeFieldName.js';

const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;

// Error-handling functions have four arguments instead of three
// req and next are not used in this middleware for the time being
const errorHandlerMiddleware = (err, _req, res, _next) => {
  const defaultError = {
    statusCode: err.statusCode || INTERNAL_SERVER_ERROR,
    message: err.message || SOMETHING_WENT_WRONG,
  }

  if (err.name === VALIDATION_ERROR) {
    defaultError.statusCode = BAD_REQUEST;
    defaultError.message = Object.values(err.errors).map(error => error.message).join(', ');
  }

  if (err.code === DUPLICATE_KEY_ERROR) {
    defaultError.statusCode = BAD_REQUEST;
    defaultError.message = `${capitalizeFieldName(Object.keys(err.keyValue)[0])} should be unique`;
  }

  res.status(defaultError.statusCode).json({
    message: defaultError.message,
  });
};

export default errorHandlerMiddleware;
