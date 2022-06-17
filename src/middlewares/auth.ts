import jwt, { JwtPayload } from 'jsonwebtoken';
import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { PayloadRequest } from '@types';

const defaultError = {
  code: 401,
  message: 'Error, You must login to access this page.',
};

export default (req: PayloadRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies?.ut) throw defaultError.message;

    jwt.verify(req.cookies.ut as string, process.env.PRIVATE_KEY!, (err, payload: any) => {
      if (err) throw defaultError.message;
      if (!payload) throw defaultError.message;
      req.payload = {
        email: payload.email,
        name: payload.name,
        admin: payload.admin,
      };
      next();
    });
  } catch (err: any) {
    res.status(401).json({
      status: defaultError.code,
      message: defaultError.message,
    });
  }
};
