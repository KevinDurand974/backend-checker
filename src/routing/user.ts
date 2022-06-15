import { Router } from 'express';
import connection from '@src/connection';

const userRoute = Router();

userRoute.get('/', async (req, res, next) => {
  try {
    // Logic Here
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export { userRoute };
