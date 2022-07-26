import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { EMAIL_IN_USE } from './constants.js';
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

  // Sanitize user-provided input to prevent NoSQL injection
  const userAlreadyExists = await User.findOne({ email: String(email) });
  if (userAlreadyExists) {
    throw new Error(EMAIL_IN_USE);
  }
  const user = await User.create({
    firstName: handleNullUndefined(firstName),
    email: handleNullUndefined(email),
    password: handleNullUndefined(password),
    lastName: handleNullUndefined(lastName),
    location: handleNullUndefined(location),
  });
  res.status(CREATED).json({ user });
};

const login = async (_req, res) => {
  res.status(200).send('login');
};

const updateUser = async (_req, res) => {
  res.status(200).send('updateUser');
};

export { register, login, updateUser };
