import HttpException, { InternalServerErrorException, NotFoundException } from '@/exceptions/HttpException';
import Secure from '@/helpers/Secure';
import { Handler } from '@/interfaces/express';
import User from '@/models/User.model';

const authenticationMiddleware: Handler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) throw new NotFoundException('No authentication token provided');

    const decoded = await Secure.jwtVerify(token);
    if (!decoded.userId) throw new NotFoundException('Invalid token');

    const currentUser: User = await User.findUserById(decoded.userId);
    if (!currentUser) throw new NotFoundException('User not found');

    req.currentUser = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticationMiddleware;
