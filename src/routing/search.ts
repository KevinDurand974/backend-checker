import { selectMusicBySearch } from '@models/music';
import { Router } from 'express';

const searchRoute = Router();

// search a music
searchRoute.post('/', async (req, res, next) => {
  try {
    const musics = await selectMusicBySearch(req.body.search);
    if (!musics.length)
      return res.status(404).json({
        status: 404,
        message: 'No music found!',
      });
    res.status(200).json({
      status: 200,
      message: 'Music founds!',
      data: musics,
    });
  } catch (err) {
    next(err);
  }
});

export { searchRoute };
