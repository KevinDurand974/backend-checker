import { PayloadRequest } from '@types';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

const defaultError = {
  code: 401,
  message: 'Error, You must login to access this page.',
};

export default (req: PayloadRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies?.ut) throw defaultError.message;

    verify(req.cookies.ut as string, process.env.PRIVATE_KEY!, (err, payload: any) => {
      if (err) throw defaultError.message;
      if (!payload) throw defaultError.message;
      req.payload = {
        email: payload.email,
        name: payload.name,
        admin: payload.admin,
        user_id: payload.user_id,
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
