import mongoose from 'mongoose';
import { isEmail, isStrongPassword } from 'validator';
import {
  IS_REQUIRED,
  NOT_VALID,
  MIN_LENGTH,
  MAX_LENGTH,
  CHARACTERS,
  MUST_BE_UNIQUE,
  STRONG_PASSWORD,
  FIRST_NAME,
  LAST_NAME,
} from './constants';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, `${FIRST_NAME} ${IS_REQUIRED}`],
    minlength: [3, `${FIRST_NAME} ${MIN_LENGTH} 3 ${CHARACTERS}`],
    maxlength: [20, `${FIRST_NAME} ${MAX_LENGTH} 20 ${CHARACTERS}`],
    trim: true,
  },
  email: {
    type: String,
    required: [true, `Email ${IS_REQUIRED}`],
    validate: [isEmail, `Email ${NOT_VALID}`],
    unique: [true, `Email ${MUST_BE_UNIQUE}`],
    trim: true,
  },
  password: {
    type: String,
    required: [true, `Password ${IS_REQUIRED}`],
    validate: [isStrongPassword, `Password ${NOT_VALID}. ${STRONG_PASSWORD}`],
    minlength: [8, `Password ${MIN_LENGTH} 8 ${CHARACTERS}`],
  },
  lastName: {
    type: String,
    required: [true, `${LAST_NAME} ${IS_REQUIRED}`],
    minlength: [3, `${LAST_NAME} ${MIN_LENGTH} 3 ${CHARACTERS}`],
    maxlength: [20, `${LAST_NAME} ${MAX_LENGTH} 20 ${CHARACTERS}`],
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, `Location ${MAX_LENGTH} 100 ${CHARACTERS}`],
  }
});

export default mongoose.model('User', UserSchema);