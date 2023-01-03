import UserController from '@/controllers/user/User.controller';
import { UserCreationObject, UserLoginObject, UserUpdatePasswordObject } from '@/dtos/User.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import BaseRouter from '../BaseRouter';

class IndexRouter extends BaseRouter<UserController> {
  constructor(path: string) {
    super(new UserController(), path);
  }

  protected routes(): void {
    this.post('register', validationMiddleware(UserCreationObject), this.controller.register);
    this.post('login', validationMiddleware(UserLoginObject), this.controller.login);
    this.authorizedPut('update_password', validationMiddleware(UserUpdatePasswordObject), this.controller.updatePassword);
  }
}

export default IndexRouter;
