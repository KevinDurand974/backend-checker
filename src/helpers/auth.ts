import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { Payload } from '@types';

export const generateAccessToken = (data: Payload) => {
  return sign(data, process.env.PRIVATE_KEY!);
};

export const hashPassword = (password: string) => {
  return hash(password, 10);
};

export const comparePassword = (password: string, hashedPassord: string) => {
  return compare(password, hashedPassord);
};
