import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../errors/index.js";
import { BEARER, NOT_AUTHORIZED } from "./constants.js";

const auth = async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(BEARER)) {
    throw new UnauthorizedError(NOT_AUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthorizedError(NOT_AUTHORIZED);
  }
};

export default auth;
