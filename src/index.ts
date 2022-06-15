import 'dotenv/config';
import express, { Response } from 'express';
import morgan from 'morgan';
import createError, { HttpError } from 'http-errors';
import connection from './connection';
import { apiUser } from '@src/routing';

const app = express();

// Middleware
app.use(express.json(), morgan('dev'));

// Routing
app.use(apiUser);

// Setup Automatic Error
app.use((_, __, next) => {
  next(new createError.NotFound());
});
app.use((err: HttpError, _: any, res: Response, __: any) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
    success: false,
  });
});

// Launch backend
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  try {
    await connection.connect();
    console.log(`App Started on: http://localhost:${port}`, `Connected on DB with ID: ${connection.threadId}`);
  } catch (err: any) {
    console.error(err.stack);
  }
});
