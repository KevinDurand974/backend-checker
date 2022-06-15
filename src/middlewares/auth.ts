import jwt, { JwtPayload } from 'jsonwebtoken';
import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '@types';

const defaultError = {
  code: 401,
  message: 'Error, You must login to access this page.',
};

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.headers || !req.headers['authorization']) throw createError(defaultError.code, defaultError.message);

    if (!req.headers.authorization.startsWith('Bearer')) throw createError(defaultError.code, defaultError.message);
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_KEY!, (err, payload: any) => {
      if (err) throw createError(defaultError.code, defaultError.message);
      if (!payload) throw createError(defaultError.code, defaultError.message);
      req.payload = {
        email: payload.email,
        id: payload.id,
        name: payload.name,
      };
      next();
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
