import { selectManyUser, selectOneUserByID, updateOneUser } from '@models/user';
import { Router } from 'express';

const musicRoute = Router();

// Select All music
musicRoute.get('/', async (req, res, next) => {
  try {
    // if (!updated) throw new Error('An error occurred, pleaze try again.');
    res.status(200).json({
      status: 200,
      message: 'User successfully updated!',
    });
  } catch (err) {
    next(err);
  }
});

export { musicRoute };
