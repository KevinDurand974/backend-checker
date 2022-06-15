import { Router } from 'express';
import connection from '@src/connection';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    // Logic Here
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export { router as apiUser };
