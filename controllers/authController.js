import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { EMAIL_IN_USE } from './constants.js';

const { CREATED, INTERNAL_SERVER_ERROR } = StatusCodes;

const register = async (req, res) => {
  const { email } = req.body;
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new Error(EMAIL_IN_USE);
  }
  const user = await User.create(req.body);
  res.status(CREATED).json({ user });
};

const login = async (_req, res) => {
  res.status(200).send('login');
};

const updateUser = async (_req, res) => {
  res.status(200).send('updateUser');
};

export { register, login, updateUser };
