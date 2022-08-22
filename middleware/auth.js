import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from "../errors/index.js";
import { BEARER, NOT_AUTHORIZED } from "./constants.js";

const auth = async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(BEARER)) {
    throw new UnauthenticatedError(NOT_AUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError(NOT_AUTHORIZED);
  }
};

export default auth;
