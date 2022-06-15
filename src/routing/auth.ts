import { Router } from 'express';
import connection from '@src/connection';

const authRoute = Router();

authRoute.get('/', async (req, res, next) => {
  try {
    // Logic Here
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export { authRoute };
