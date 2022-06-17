import { selectAllMusicFromUser } from '@models/music';
import { addOneMusicToUser, removeMusicFromUser, selectManyUser, selectOneUserByID, updateOneUser } from '@models/user';
import { PayloadRequest } from '@types';
import { Router } from 'express';

const userRoute = Router();

// Select All Users
userRoute.get('/', async (req, res, next) => {
  try {
    const users = await selectManyUser();
    if (!users)
      return res.status(404).json({
        status: 404,
        message: 'No user found!',
      });
    res.status(200).json({
      status: 200,
      message: 'All user found!',
      data: users,
    });
  } catch (err) {
    next(err);
  }
});

// Select all musics from user
userRoute.get('/music', async (req, res, next) => {
  try {
    const musics = await selectAllMusicFromUser((req as PayloadRequest).payload.user_id!);
    if (!musics.length)
      return res.status(200).json({
        status: 200,
        message: 'You dont have any music.',
      });
    res.status(200).json({
      status: 200,
      message: 'User music list',
      data: musics,
    });
  } catch (err) {
    next(err);
  }
});

// Select an User by ID
userRoute.get('/:id', async (req, res, next) => {
  try {
    const user = await selectOneUserByID(+req.params.id);
    if (!user)
      return res.status(404).json({
        status: 404,
        message: 'No user found!',
      });
    res.status(200).json({
      status: 200,
      message: 'User found!',
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

// Update an User
userRoute.put('/:id', async (req, res, next) => {
  try {
    const updated = await updateOneUser(req.body, +req.params.id);
    if (!updated)
      return res.status(200).json({
        status: 200,
        message: 'An error occurred, please try again.',
      });
    res.status(200).json({
      status: 200,
      message: 'User successfully updated!',
    });
  } catch (err) {
    next(err);
  }
});

// Add a music to an user
userRoute.post('/music', async (req, res, next) => {
  try {
    const added = await addOneMusicToUser(req.body.music_id, (req as PayloadRequest).payload.user_id!);
    if (!added)
      return res.status(500).json({
        status: 500,
        message: 'An error occurred, please try again.',
      });
    res.status(200).json({
      status: 200,
      message: 'Music successfully added to user!',
    });
  } catch (err) {
    next(err);
  }
});

// Remove a music form an user
userRoute.delete('/music', async (req, res, next) => {
  try {
    const deleted = await removeMusicFromUser(req.body.music_id, (req as PayloadRequest).payload.user_id!);
    if (!deleted)
      return res.status(500).json({
        status: 500,
        message: 'An error occurred, please try again.',
      });
    res.status(200).json({
      status: 200,
      message: 'Music successfully removed from user!',
    });
  } catch (err) {
    next(err);
  }
});

export { userRoute };
