import 'dotenv/config';
import express, { Response } from 'express';
import morgan from 'morgan';
import createError, { HttpError } from 'http-errors';
import cookieParser from 'cookie-parser';
import connection from './connection';
import { userRoute, authRoute, musicRoute } from '@src/routing';
import auth from '@middlewares/auth';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Routing Middleware
app.use('/api/auth', authRoute);
app.use('/api/user', auth as any, userRoute);
app.use('/api/music', auth as any, musicRoute);

// Setup Automatic Error
app.use((_, __, next) => {
  next(new createError.NotFound());
});
app.use((err: HttpError, _: any, res: Response, __: any) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

// Launch backend
const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connection.connect();
    console.log(`App Started on: http://localhost:${port}`);
    console.log(`Connected on DB with ID: ${connection.threadId}`);
  } catch (err: any) {
    console.error(err.stack);
  }
});
