import { NextFunction, Response, Request } from 'express';

const defaultError = {
  code: 200,
  message: 'You are already logged.',
};

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.cookies?.ut) {
      throw new Error(defaultError.message);
    } else {
      next();
    }
  } catch (err: any) {
    res.status(200).json({
      status: defaultError.code,
      message: defaultError.message,
    });
  }
};
