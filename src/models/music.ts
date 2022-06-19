import connection from '@src/connection';
import { Music } from '@types';
import createError, { HttpError } from 'http-errors';
import { RowDataPacket } from 'mysql2';

// Select all musics
export const selectManyMusic = async () => {
  try {
    const [musicList] = (await connection.query('SELECT * FROM musics')) as RowDataPacket[][];
    return musicList as Music[];
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Search and select musics
export const selectMusicBySearch = async (search: string) => {
  try {
    const [musics] = (await connection.query('SELECT * FROM musics WHERE CONCAT(artist, title, music_id) LIKE ?', [
      `%${search}%`,
    ])) as RowDataPacket[][];
    return musics as Music[];
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Select all music of an user
export const selectAllMusicFromUser = async (user_id: number) => {
  try {
    const [umMusics] = (await connection.query('SELECT music_id FROM user_musics WHERE user_id = ?', [
      user_id,
    ])) as RowDataPacket[][];
    if (!umMusics.length) return [];
    const musicIds = umMusics.map(music => music.music_id);
    const [musics] = (await connection.query(`SELECT * FROM musics WHERE music_id IN (?)`, [
      musicIds,
    ])) as RowDataPacket[][];
    return musics as Music[];
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Add one music and add a link to the user
export const addOneMusic = async ({ artist, title }: Partial<Music>, user_id: number) => {
  try {
    const countData = (await connection.query('SELECT COUNT(*) as count FROM musics WHERE title = ? AND artist = ?', [
      title,
      artist,
    ])) as RowDataPacket[][];
    if (countData[0][0].count) throw createError(500, 'This music already exist!');

    const [insertMusic] = (await connection.query('INSERT INTO musics (title, artist) VALUES (?, ?)', [
      title,
      artist,
    ])) as RowDataPacket[];
    if (!insertMusic.affectedRows) throw createError(500, 'An error occurred, please try again.');
    const insertedId = insertMusic.insertId;

    const [insertMusicToUser] = (await connection.query('INSERT INTO user_musics (user_id, music_id) VALUES (?, ?)', [
      user_id,
      insertedId,
    ])) as RowDataPacket[];
    if (!insertMusicToUser.affectedRows) throw createError(500, 'An error occurred, please try again.');

    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Update a music
export const updateOneMusic = async (updatedData: Partial<Music>, music_id: number) => {
  try {
    const [[musicDb]] = (await connection.query('SELECT * FROM musics WHERE music_id = ?', [
      music_id,
    ])) as RowDataPacket[][];
    if (!musicDb) throw createError(404, 'This music doesnt exist.');

    const [update] = (await connection.query('UPDATE musics SET ? WHERE music_id = ?', [
      updatedData,
      music_id,
    ])) as RowDataPacket[];
    if (!update.affectedRows) throw createError(500, 'An error occurred, please try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Remove a music (Cascade)
export const removeOneMusicById = async (music_id: number) => {
  try {
    const [[musicDb]] = (await connection.query('SELECT COUNT(*) as count FROM musics WHERE music_id = ?', [
      music_id,
    ])) as RowDataPacket[][];
    if (!musicDb.count) throw createError(404, 'Error, this music doesnt exist.');

    const [del] = (await connection.query('DELETE FROM musics WHERE music_id = ?', [music_id])) as RowDataPacket[];
    if (!del.affectedRows) throw createError(500, 'An error occurred, please try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};
