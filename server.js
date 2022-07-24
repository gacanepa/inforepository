import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import connect from './db/connect.js';
import authRouter from './routes/authRouter.js';
import docsRouter from './routes/docsRouter.js';
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
} from './middleware/index.js';

// Instantiate the express app and hide the X-Powered-By header
const app = express();
app.use(helmet.hidePoweredBy());

// Parse incoming requests with JSON payloads and puts the resulting object on req.body
app.use(express.json());

// Set up the routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/docs', docsRouter);

// Load environment variables
dotenv.config();

app.get('/', (req, res) => {
  res.status(200).json({
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
