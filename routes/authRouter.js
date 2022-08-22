import express from 'express';
import { register, login, updateUser } from '../controllers/authController.js';
import authorizeUser from '../middleware/auth.js';

const authRouter = express.Router();

// These routes are public (everyone should be able to register or login)...
authRouter.route('/register').post(register);
authRouter.route('/login').post(login);

// ... but this one requires authorization
authRouter.route('/updateUser').patch(authorizeUser, updateUser);

export default authRouter;
