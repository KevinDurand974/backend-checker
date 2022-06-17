import { Request } from 'express';

export type User = {
  user_id?: number;
  email: string;
  name: string;
  password?: string;
  admin?: boolean;
};

export type Music = {
  music_id: number;
  title: string;
  artist: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserData = {
  name: string;
  email: string;
  password: string;
};

export type PayloadRequest = Request & { payload: User };
