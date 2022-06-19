import { validateMusicData, validateUpdateMusicData } from '@helpers/validator';
import { addOneMusic, removeOneMusicById, selectManyMusic, updateOneMusic } from '@models/music';
import { PayloadRequest } from '@types';
import { Router } from 'express';

const musicRoute = Router();

// Select All music
musicRoute.get('/', async (req, res, next) => {
  try {
    const musics = await selectManyMusic();
    if (!musics.length)
      return res.status(404).json({
        status: 404,
        message: 'No music found!',
      });
    res.status(200).json({
      status: 200,
      message: 'Musics founds!',
      data: musics,
    });
  } catch (err) {
    next(err);
  }
});

// Add one music
musicRoute.post('/', async (req, res, next) => {
  try {
    const body = await validateMusicData(req.body);
    const added = await addOneMusic(body, (req as PayloadRequest).payload.user_id!);
    if (!added)
      return res.status(500).json({
        status: 500,
        message: 'Somethings went wrong, please retry.',
      });
    res.status(200).json({
      status: 200,
      message: 'Music successfully added!',
    });
  } catch (err) {
    next(err);
  }
});

// Update one music
musicRoute.put('/:id', async (req, res, next) => {
  try {
    const music_id = req.params.id;
    const body = await validateUpdateMusicData(req.body);
    const updated = await updateOneMusic(body, +music_id);
    if (!updated)
      return res.status(500).json({
        status: 500,
        message: 'Somethings went wrong, please retry.',
      });
    res.status(200).json({
      status: 200,
      message: 'Music successfully updated!',
    });
  } catch (err) {
    next(err);
  }
});

// Remove one music
musicRoute.delete('/:id', async (req, res, next) => {
  try {
    const music_id = req.params.id;
    const removed = await removeOneMusicById(+music_id);
    if (!removed)
      return res.status(500).json({
        status: 500,
        message: 'Somethings went wrong, please retry.',
      });
    res.status(200).json({
      status: 200,
      message: 'Music successfully deleted!',
    });
  } catch (err) {
    next(err);
  }
});

export { musicRoute };
