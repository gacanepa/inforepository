import User from '../models/User.js';
import { UnauthorizedError } from '../errors/index.js';
import handleNullUndefined from './handleNullUndefined.js';
import { NOT_AUTHORIZED_TO_ACCESS_ROUTE } from '../controllers/constants.js';

const checkPermissions = async ({ userId, resourceUserId }) => {
  const requestUser = await User.findById(handleNullUndefined(userId));

  // Only a super user or the post author can update or delete posts
  if (requestUser.isSuperUser || userId === String(resourceUserId)) return;

  throw new UnauthorizedError(NOT_AUTHORIZED_TO_ACCESS_ROUTE);
};

export default checkPermissions;
