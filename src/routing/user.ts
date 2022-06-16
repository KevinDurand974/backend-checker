import { selectManyUser, selectOneUserByID, updateOneUser } from '@models/user';
import { Router } from 'express';

const userRoute = Router();

// Update an User
userRoute.put('/:id', async (req, res, next) => {
  try {
    const updated = await updateOneUser(req.body, +req.params.id);
    if (!updated) throw new Error('An error occurred, pleaze try again.');
    res.status(200).json({
      status: 200,
      message: 'User successfully updated!',
    });
  } catch (err) {
    next(err);
  }
});

// Select an User by ID
userRoute.get('/:id', async (req, res, next) => {
  try {
    const user = await selectOneUserByID(+req.params.id);
    if (!user) throw new Error('An error occurred, pleaze try again.');
    res.status(200).json({
      status: 200,
      message: 'User found!',
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

// Select All Users
userRoute.get('/', async (req, res, next) => {
  try {
    const users = await selectManyUser();
    if (!users) throw new Error('An error occurred, pleaze try again.');
    res.status(200).json({
      status: 200,
      message: 'All user found!',
      data: users,
    });
  } catch (err) {
    next(err);
  }
});

export { userRoute };
