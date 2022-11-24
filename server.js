import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import connect from './db/connect.js';
import authRouter from './routes/authRouter.js';
import postsRouter from './routes/postsRouter.js';
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
} from './middleware/index.js';
import authorizeUser from './middleware/auth.js';
import { StatusCodes } from 'http-status-codes';

// Get status codes
const { OK } = StatusCodes;

// Instantiate the express app and hide the X-Powered-By header
const app = express();
app.use(helmet.hidePoweredBy());

// Allow requests from the development frontend and the production app instance
app.use(cors({
  origin: [
    process.env.DEV_FRONTEND,
    process.env.APP_BUILD,
  ],
}));

// Set up logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Parse incoming requests with JSON payloads and puts the resulting object on req.body
app.use(express.json());

// Set up the routes
app.use('/api/v1/auth', authRouter);
// All job routes require authorization
app.use('/api/v1/posts', authorizeUser, postsRouter);

// Load environment variables
dotenv.config();

app.get('/', (req, res) => {
  res.status(OK).json({
    reqUrl: req.url,
    message: 'Hello World!',
  });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;

const start = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

start();
