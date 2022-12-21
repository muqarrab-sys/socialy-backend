import BaseController from '@/lib/BaseController';
import { Handler } from 'express';

class UserController extends BaseController {
  constructor() {
    super();
  }

  public register: Handler = (req, res) => {};

  public login: Handler = (req, res) => {};

  public update: Handler = (req, res) => {};

  public delete: Handler = (req, res) => {};
}

export default UserController;
