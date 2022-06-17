import connection from '@src/connection';
import { UpdateUserData, User } from '@types';
import createError, { HttpError } from 'http-errors';
import { RowDataPacket } from 'mysql2';

export const selectOneUser = async (email: string) => {
  try {
    const countData = (await connection.query(
      'SELECT COUNT(*) as count, email, password, name FROM users WHERE email = ?',
      [email]
    )) as RowDataPacket[][];
    if (!countData[0][0].count) throw createError(403, "User doesn't exist!");
    delete countData[0][0].count;
    return countData[0][0];
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const selectOneUserByID = async (id: number) => {
  try {
    const countData = (await connection.query('SELECT * FROM users WHERE id = ?', [id])) as RowDataPacket[][];
    const user = countData[0][0];
    return countData[0].length ? { ...user, admin: !!user.admin } : user;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const selectManyUser = async () => {
  try {
    const countData = (await connection.query('SELECT * FROM users')) as RowDataPacket[][];
    const users = countData[0];
    return users.length ? users.map(user => ({ ...user, admin: !!user.admin })) : users;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const selectManyUserMusic = async (user_id: number) => {
  try {
    const [musicList] = (await connection.query(
      'SELECT * FROM user_musics INNER JOIN users ON users.id = user_musics.user_id INNER JOIN musics ON musics.id = user_musics.music_id WHERE user_id = ?',
      [user_id]
    )) as RowDataPacket[][];
    return musicList;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const addOneUser = async ({ email, password, admin }: Partial<User>) => {
  try {
    const countData = (await connection.query('SELECT COUNT(*) as count FROM users WHERE email = ?', [
      email,
    ])) as RowDataPacket[][];
    if (countData[0][0].count) throw createError(500, 'User already exist!');

    const insertData = (await connection.query('INSERT INTO users (email, password, admin) VALUES (?, ?, ?)', [
      email,
      password,
      admin,
    ])) as RowDataPacket[];

    if (!insertData[0].affectedRows) throw createError(500, 'An error occurred, pleaze try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const addOneMusicToUser = async (music_id: string, user_id: string) => {
  try {
    const [addMusic] = (await connection.query('INSERT INTO user_musics (user_id, music_id) VALUES (?, ?)', [
      user_id,
      music_id,
    ])) as RowDataPacket[];
    if (!addMusic.affectedRows) throw createError(500, 'An error occurred, pleaze try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const updateOneUser = async (data: Partial<UpdateUserData>, id: number) => {
  try {
    const countData = (await connection.query('SELECT COUNT(*) as count FROM users WHERE id = ?', [
      id,
    ])) as RowDataPacket[][];
    if (!countData[0][0].count) throw createError(403, "User doesn't exist!");

    const updatedValue = [];
    let sql = 'UPDATE users SET';
    if (data?.name) {
      updatedValue.push(data.name);
      sql += ' name = ?';
    }

    if (!updatedValue) throw new Error('Nothing to update.');

    const update = (await connection.query(sql + ' WHERE id = ?', [...updatedValue, id])) as RowDataPacket[];

    if (!update[0].affectedRows) throw createError(500, 'An error occurred, pleaze try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const removeOneUserById = async (id: number) => {
  try {
    const [[userDb]] = (await connection.query('SELECT COUNT(*) as count FROM users WHERE id = ?', [
      id,
    ])) as RowDataPacket[][];
    if (!userDb.count) throw createError(404, 'Error, this user doesnt exist.');

    const [del] = (await connection.query('DELETE FROM users WHERE id = ?', [id])) as RowDataPacket[];
    if (!del.affectedRows) throw createError(500, 'An error occurred, pleaze try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const removeMusicFromUser = async (music_id: string, user_id: string) => {
  try {
    const [removeMusic] = (await connection.query('DELETE FROM user_musics WHERE user_id = ? AND music_id = ?', [
      user_id,
      music_id,
    ])) as RowDataPacket[];
    if (!removeMusic.affectedRows) throw createError(500, 'An error occurred, pleaze try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};
