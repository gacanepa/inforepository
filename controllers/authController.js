import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { EMAIL_IN_USE } from './constants.js';

const { CREATED, INTERNAL_SERVER_ERROR } = StatusCodes;

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
    firstName: String(firstName),
    email: String(email),
    password: String(password),
    lastName: String(lastName),
    location: String(location)
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
