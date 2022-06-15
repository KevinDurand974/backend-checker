import jwt, { JwtPayload } from 'jsonwebtoken';
import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';

const defaultError = {
  code: 401,
  message: 'Error, You must login to access this page.',
};

type CustomRequest = Request & { payload: JwtPayload };

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.headers || !req.headers['authorization']) throw createError(defaultError.code, defaultError.message);

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_KEY!, (err, payload) => {
      if (err) throw createError(defaultError.code, defaultError.message);
      if (!payload) throw createError(defaultError.code, defaultError.message);
      req.payload = payload as JwtPayload;
      next();
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
