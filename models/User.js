import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
  SALT_ROUNDS,
} from './constants.js';

const { isEmail, isStrongPassword } = validator;

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
    validate: {
      validator: isEmail,
      message: `Email ${NOT_VALID}`,
    },
    unique: [true, `Email ${MUST_BE_UNIQUE}`],
    trim: true,
  },
  password: {
    type: String,
    required: [true, `Password ${IS_REQUIRED}`],
    validate: {
      validator: isStrongPassword,
      message: `Password ${NOT_VALID}. ${STRONG_PASSWORD}`
    },
    minlength: [8, `Password ${MIN_LENGTH} 8 ${CHARACTERS}`],
    // Don't return the password in the response when querying for users
    select: false,
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
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isSuperUser: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: String,
    default: new Date().toLocaleString(
      process.env.LOCALE,
      { timeZone: process.env.TIME_ZONE }
    ),
  }
});

// Cannot use arrow functions here because we need access to the global scope
UserSchema.pre('save', async function () {
  // Skip the password salting and hashing if we are not updating the password
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to create a JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
}

UserSchema.methods.comparePassword = async function (password) {
  // Awaiting inside of the method is redundant because the calling function will also await
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
