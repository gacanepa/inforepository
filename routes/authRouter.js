import express from 'express';
import { register, login, updateUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';

const authRouter = express.Router();

// These routes are public (everyone should be able to register or login)...
authRouter.route('/register').post(register);
authRouter.route('/login').post(login);

// ... but this one requires authentication
authRouter.route('/updateUser').patch(authenticateUser, updateUser);

export default authRouter;
