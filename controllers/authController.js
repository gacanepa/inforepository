import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { BadRequestError, UnauthorizedError } from '../errors/index.js';
import {
  EMAIL_IN_USE,
  PLEASE_PROVIDE_ALL_VALUES,
  INVALID_CREDENTIALS,
  ACCOUNT_DOES_NOT_EXIST
} from './constants.js';
import handleNullUndefined from '../utilities/handleNullUndefined.js';

const { CREATED, OK } = StatusCodes;

const register = async (req, res) => {
  const {
    firstName,
    email,
    password,
    lastName,
    location
  } = req.body;

  if (!firstName || !email || !password || !lastName) {
    throw new BadRequestError(PLEASE_PROVIDE_ALL_VALUES);
  }

  // Sanitize user-provided input to prevent NoSQL injection
  const existingUser = await User.findOne({ email: String(email) });
  if (existingUser) {
    throw new BadRequestError(EMAIL_IN_USE);
  }

  const user = await User.create({
    firstName: handleNullUndefined(firstName),
    email: handleNullUndefined(email),
    password: handleNullUndefined(password),
    lastName: handleNullUndefined(lastName),
    location: handleNullUndefined(location),
  });

  const token = user.createJWT();

  // Do not include the password in the response when creating a user
  res.status(CREATED).json({
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
    },
    token
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(PLEASE_PROVIDE_ALL_VALUES);
  }

  // Add '+password' to include the password in the response
  // (by default it is not present because of the model definition)
  const user = await User.findOne({ email: String(email) }).select('+password');
  if (!user) {
    throw new UnauthorizedError(INVALID_CREDENTIALS);
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new UnauthorizedError(INVALID_CREDENTIALS);
  }

  // Make password undefined to remove it from the response
  user.password = undefined;

  const token = user.createJWT();
  res.status(OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, location } = req.body;
  if (!firstName || !lastName) {
    throw new BadRequestError(PLEASE_PROVIDE_ALL_VALUES);
  }

  // We have an id at this point, so we use it to get the user in question
  const existingUser = await User.findOne({ _id: String(req.user.userId) });

  if (!existingUser) {
    throw new BadRequestError(ACCOUNT_DOES_NOT_EXIST);
  }

  existingUser.location = location;
  existingUser.firstName = firstName;
  existingUser.lastName = lastName;

  existingUser.save();

  const token = existingUser.createJWT();

  res.status(OK).json({
    user: {
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      location: existingUser.location,
    },
    token
  });
};

export { register, login, updateUser };
