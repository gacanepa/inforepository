import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPIError.js';

const { UNAUTHORIZED } = StatusCodes;

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

export default UnauthorizedError;
