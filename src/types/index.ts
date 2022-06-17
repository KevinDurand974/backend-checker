import { Request } from 'express';

export type User = {
  id?: number;
  email: string;
  name: string;
  password?: string;
  admin?: boolean;
};

export type Music = {
  id: number;
  title: string;
  artist: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MusicKeys = keyof Music;

export type UpdateUserData = {
  name: string;
  email: string;
  password: string;
};

export type PayloadRequest = Request & { payload: User };
