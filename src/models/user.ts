import connection from '@src/connection';
import { UpdateUserData, User } from '@types';
import createError, { HttpError } from 'http-errors';
import { RowDataPacket } from 'mysql2';

// Select an user with his email
export const selectOneUser = async (email: string) => {
  try {
    const countData = (await connection.query(
      'SELECT COUNT(*) as count, email, password, name, user_id, admin FROM users WHERE email = ?',
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

// Select an user with his ID
export const selectOneUserByID = async (user_id: number) => {
  try {
    const countData = (await connection.query('SELECT * FROM users WHERE users.user_id = ?', [
      user_id,
    ])) as RowDataPacket[][];
    const user = countData[0][0];
    return countData[0].length ? { ...user, admin: !!user.admin } : user;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Select all users
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

// Add an user
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

    if (!insertData[0].affectedRows) throw createError(500, 'An error occurred, please try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Add a music to an user
export const addOneMusicToUser = async (music_id: number, user_id: number) => {
  try {
    const [addMusic] = (await connection.query('INSERT INTO user_musics (user_id, music_id) VALUES (?, ?)', [
      user_id,
      music_id,
    ])) as RowDataPacket[];
    if (!addMusic.affectedRows) throw createError(500, 'An error occurred, please try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Update an user
export const updateOneUser = async (data: Partial<UpdateUserData>, user_id: number) => {
  try {
    const countData = (await connection.query('SELECT COUNT(*) as count FROM users WHERE user_id = ?', [
      user_id,
    ])) as RowDataPacket[][];
    if (!countData[0][0].count) throw createError(403, "User doesn't exist!");

    const updatedValue = [];
    let sql = 'UPDATE users SET';
    if (data?.name) {
      updatedValue.push(data.name);
      sql += ' name = ?';
    }

    if (!updatedValue) throw new Error('Nothing to update.');

    const update = (await connection.query(sql + ' WHERE user_id = ?', [...updatedValue, user_id])) as RowDataPacket[];

    if (!update[0].affectedRows) throw createError(500, 'An error occurred, please try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Remove an user
export const removeOneUserById = async (id: number) => {
  try {
    const [[userDb]] = (await connection.query('SELECT COUNT(*) as count FROM users WHERE user_id = ?', [
      id,
    ])) as RowDataPacket[][];
    if (!userDb.count) throw createError(404, 'Error, this user doesnt exist.');

    const [del] = (await connection.query('DELETE FROM users WHERE user_id = ?', [id])) as RowDataPacket[];
    if (!del.affectedRows) throw createError(500, 'An error occurred, please try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

// Remove a music from an user
export const removeMusicFromUser = async (music_id: string, user_id: number) => {
  try {
    const [[umDb]] = (await connection.query(
      'SELECT COUNT(*) as count FROM user_musics WHERE user_id = ? AND music_id = ?',
      [user_id, music_id]
    )) as RowDataPacket[][];
    if (!umDb.count) throw createError(404, 'Error, this user doesnt exist.');

    const [removeMusic] = (await connection.query('DELETE FROM user_musics WHERE user_id = ? AND music_id = ?', [
      user_id,
      music_id,
    ])) as RowDataPacket[];
    if (!removeMusic.affectedRows) throw createError(500, 'An error occurred, please try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};
