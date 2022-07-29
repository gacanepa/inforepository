import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { BadRequestError } from '../errors/index.js';
import { EMAIL_IN_USE, PLEASE_PROVIDE_ALL_VALUES } from './constants.js';
import handleNullUndefined from '../utilities/handleNullUndefined.js';

const { CREATED } = StatusCodes;

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
  const userAlreadyExists = await User.findOne({ email: String(email) });
  if (userAlreadyExists) {
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

const login = async (_req, res) => {
  res.status(200).send('login');
};

const updateUser = async (_req, res) => {
  res.status(200).send('updateUser');
};

export { register, login, updateUser };
