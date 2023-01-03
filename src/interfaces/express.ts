import User from '@/models/User.model';
import { NextFunction, Request, Response } from 'express';

export interface Req extends Request {
  currentUser?: User;
}

export type Handler = (req: Req, res: Response, next: NextFunction) => void;
