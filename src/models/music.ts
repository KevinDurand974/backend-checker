import connection from '@src/connection';
import createError, { HttpError } from 'http-errors';
import { RowDataPacket } from 'mysql2';
import { Music, MusicKeys } from '@types';

export const selectManyMusic = async () => {
  try {
    const [musicList] = (await connection.query('SELECT * FROM musics')) as RowDataPacket[][];
    return musicList as Music[];
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const selectMusicBySearch = async (search: string) => {
  try {
    const [musics] = (await connection.query(`SELECT * FROM musics WHERE CONCAT(artist, title, id) LIKE '%?%'`, [
      search,
    ])) as RowDataPacket[][];
    return musics as Music[];
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const selectOneMusicBy = async (filter: MusicKeys, value: string) => {
  try {
    const [music] = (await connection.query(`SELECT * FROM musics WHERE ${filter} = ?`, [value])) as RowDataPacket[][];
    return music[0] as Music;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const selectManyMusicUser = async (music_id: number) => {
  try {
    const [musicList] = (await connection.query(
      'SELECT * FROM user_musics INNER JOIN users ON users.id = user_musics.user_id INNER JOIN musics ON musics.id = user_musics.music_id WHERE music_id = ?',
      [music_id]
    )) as RowDataPacket[][];
    return musicList;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const addOneMusic = async ({ artist, title }: Partial<Music>, user_id: string) => {
  try {
    const countData = (await connection.query('SELECT COUNT(*) as count FROM musics WHERE title = ? AND artist = ?', [
      title,
      artist,
    ])) as RowDataPacket[][];
    if (countData[0][0].count) throw createError(500, 'This music already exist!');

    const [insertMusic] = (await connection.query('INSERT INTO music (title, artist) VALUES (?, ?)', [
      title,
      artist,
    ])) as RowDataPacket[];
    if (!insertMusic.affectedRows) throw createError(500, 'An error occurred, pleaze try again.');
    const insertedId = insertMusic.insertId;

    const [insertMusicToUser] = (await connection.query('INSERT INTO users_musics (user_id, music_id) VALUES (?, ?)', [
      user_id,
      insertedId,
    ])) as RowDataPacket[];
    if (!insertMusicToUser.affectedRows) throw createError(500, 'An error occurred, pleaze try again.');

    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const updateOneMusic = async (updatedData: Partial<Music>, id: number) => {
  try {
    const [[musicDb]] = (await connection.query('SELECT * FROM music WHERE id = ?', [id])) as RowDataPacket[][];
    if (!musicDb) throw createError(404, 'This music doesnt exist.');

    const [update] = (await connection.query('UPDATE musics SET ? WHERE id = ?', [updatedData, id])) as RowDataPacket[];
    if (!update.affectedRows) throw createError(500, 'An error occurred, pleaze try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const removeOneMusicById = async (id: number) => {
  try {
    const [[musicDb]] = (await connection.query('SELECT COUNT(*) as count FROM musics WHERE id = ?', [
      id,
    ])) as RowDataPacket[][];
    if (!musicDb.count) throw createError(404, 'Error, this music doesnt exist.');

    const [del] = (await connection.query('DELETE FROM musics WHERE id = ?', [id])) as RowDataPacket[];
    if (!del.affectedRows) throw createError(500, 'An error occurred, pleaze try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};
