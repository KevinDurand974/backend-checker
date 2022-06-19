import { PayloadRequest } from '@types';
import { NextFunction, Response, RequestHandler } from 'express';

const defaultError = {
  code: 403,
  message: 'Error, missing permission.',
};

export default (req: PayloadRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.payload.admin) throw defaultError.message;
    next();
  } catch (err: any) {
    res.status(403).json({
      status: defaultError.code,
      message: defaultError.message,
    });
  }
};
