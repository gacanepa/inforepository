import { UnauthorizedError } from '../errors/index.js';
import { NOT_AUTHORIZED_TO_ACCESS_ROUTE } from '../controllers/constants.js';

const checkPermissions = ({ userId, resourceUserId }) => {
  // Only a super user or the post author can update or delete posts
  if (userId === String(resourceUserId)) return;

  throw new UnauthorizedError(NOT_AUTHORIZED_TO_ACCESS_ROUTE);
};

export default checkPermissions;
