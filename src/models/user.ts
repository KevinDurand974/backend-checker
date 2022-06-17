import connection from '@src/connection';
import { RegisterData, UpdateUserData } from '@types';
import { HttpError } from 'http-errors';
import createError from 'http-errors';
import { RowDataPacket } from 'mysql2';

export const createOneUser = async ({ email, password }: RegisterData) => {
  try {
    const countData = (await connection.query('SELECT COUNT(*) as count FROM users WHERE email = ?', [
      email,
    ])) as RowDataPacket[][];
    if (countData[0][0].count) throw createError(403, 'User already exist!');

    const insertData = (await connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [
      email,
      password,
    ])) as RowDataPacket[];

    if (!insertData[0].affectedRows) throw createError(500, 'An error occurred, pleaze try again.');
    return true;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

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

export const selectOneUserByID = async (id: number) => {
  try {
    const countData = (await connection.query('SELECT * FROM users WHERE id = ?', [id])) as RowDataPacket[][];
    if (!countData[0].length) throw createError(500, 'User not found!');
    return countData[0][0];
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};

export const selectManyUser = async () => {
  try {
    const countData = (await connection.query('SELECT * FROM users')) as RowDataPacket[][];
    if (!countData[0].length) throw createError(500, 'No user found!');
    return countData[0];
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};
