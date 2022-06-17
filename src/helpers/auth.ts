import { User } from '@types';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const generateAccessToken = (data: User) => {
  return sign(data, process.env.PRIVATE_KEY!);
};

export const hashPassword = (password: string) => {
  return hash(password, 10);
};

export const comparePassword = (password: string, hashedPassord: string) => {
  return compare(password, hashedPassord);
};
