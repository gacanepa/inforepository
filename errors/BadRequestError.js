import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPIError.js';

const { BAD_REQUEST } = StatusCodes;

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

export default BadRequestError;
