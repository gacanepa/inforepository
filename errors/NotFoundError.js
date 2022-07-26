import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPIError.js';

const { NOT_FOUND } = StatusCodes;

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

export default NotFoundError;
