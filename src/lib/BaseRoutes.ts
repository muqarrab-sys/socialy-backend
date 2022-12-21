import express from 'express';
import BaseController from './BaseController';

export type RouteClass = { new (app: express.Application): BaseRoutes };

abstract class BaseRoutes {
  protected baseRoute = '/';
  protected app: express.Application;
  protected controller: BaseController;

  constructor(app: express.Application, controller: BaseController) {
    this.app = app;
    this.controller = controller;
  }

  abstract routes(): void;

  protected router = (path: string) => {
    return this.app.route(this.baseRoute + path);
  };
}

export default BaseRoutes;
