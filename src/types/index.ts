import { Request } from 'express';

export type Payload = {
  email: string;
  id: string;
  name: string;
};

export type RegisterData = {
  email: string;
  password: string;
};

export type PayloadRequest = Request & { payload: Payload };
export type RegisterRequest = Request & { data: RegisterData };
