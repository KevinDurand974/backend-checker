import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type Payload = {
  email: string;
  id: string;
  name: string;
};

export type CustomRequest = Request & { payload: Payload };
