import connection from '@src/connection';
import { RegisterData } from '@types';
import { HttpError } from 'http-errors';
import createError from 'http-errors';
import { RowDataPacket } from 'mysql2';

export const createUser = async ({ email, password }: RegisterData) => {
  try {
    const existSql = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
    const [{ count }] = (await connection.query(existSql, [email]))[0] as RowDataPacket[];
    if (count) throw createError(403, 'User already exist!');

    const insertSql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [queryData] = (await connection.query(insertSql, [email, password])) as RowDataPacket[];
    const insertId = queryData.insertId;

    const selectSql = 'SELECT email FROM users WHERE id = ?';
    const [data] = (await connection.query(selectSql, [insertId])) as RowDataPacket[];
    return data[0];
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw createError(500, error.message);
  }
};
