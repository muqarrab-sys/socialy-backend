import express from 'express';
import UserController from '@/controllers/user/User.controller';
import BaseRoutes from '@/lib/BaseRoutes';

class UserRoutes extends BaseRoutes {
  protected baseRoute = '/users/';

  constructor(app: express.Application) {
    super(app, new UserController());
  }

  public routes(): void {
    this.router('login').get((req, res) => {
      res.send('Login');
    });
  }
}

export default UserRoutes;
