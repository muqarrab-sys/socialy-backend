import { Req } from '@/interfaces/express';
import { NextFunction, Response } from 'express';

export type ExMiddleware = (req: Req, res: Response, next: NextFunction) => any;

const tryCatchWrapper = (cb: ExMiddleware) => async (req: Req, res: Response, next: NextFunction) => {
  try {
    await cb(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default tryCatchWrapper;
