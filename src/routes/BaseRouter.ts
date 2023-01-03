import BaseController from '@/lib/BaseController';
import authenticationMiddleware from '@/middlewares/authentication.middleware';
import tryCatchWrapper from '@/middlewares/exception.middleware';
import logger from '@/utils/logger';
import express, { IRouter, RequestHandler } from 'express';
import { isArray } from 'lodash';

export type RouterClass = { new (): BaseRouter<any> };
export type Methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export type Call = (path: string, ...handlers: RequestHandler[]) => void;
export type CallOptions = {
  secured?: boolean;
};

export default abstract class BaseRouter<T = BaseController> {
  private baseRoute: string;
  router: IRouter = express.Router();

  constructor(protected readonly controller: T, path: string = '') {
    let baseName = this.constructor.name.replace('Router', '').toLowerCase();
    baseName = baseName === 'index' ? '' : baseName;
    this.baseRoute = path + (path ? `${baseName}` : baseName);

    this.routes();
  }

  protected abstract routes(): void;

  private parseEndPoint(path: string | Array<string>): string {
    const endPoint = [this.baseRoute]
      .concat(isArray(path) ? path : path.split('/'))
      .filter(part => part !== '')
      .join('/');

    return `/${endPoint}`;
  }

  private call(method: Methods, path: string, handlers: RequestHandler[], options?: CallOptions): void {
    handlers[handlers.length - 1] = tryCatchWrapper(handlers[handlers.length - 1]);

    if (options?.secured) {
      handlers = [authenticationMiddleware, ...handlers];
    }

    logger.info(`${method.toUpperCase()}: ${this.parseEndPoint(path)}`);

    this.router[method](this.parseEndPoint(path), ...handlers);
  }

  protected get: Call = (path, ...handlers) => this.call('get', path, handlers);
  protected post: Call = (path, ...handlers) => this.call('post', path, handlers);
  protected put: Call = (path, ...handlers) => this.call('put', path, handlers);
  protected delete: Call = (path, ...handlers) => this.call('delete', path, handlers);
  protected patch: Call = (path, ...handlers) => this.call('patch', path, handlers);

  protected authorizedGet: Call = (path, ...handlers) => this.call('get', path, handlers, { secured: true });
  protected authorizedPost: Call = (path, ...handlers) => this.call('post', path, handlers, { secured: true });
  protected authorizedPut: Call = (path, ...handlers) => this.call('put', path, handlers, { secured: true });
  protected authorizedDelete: Call = (path, ...handlers) => this.call('delete', path, handlers, { secured: true });
  protected authorizedPatch: Call = (path, ...handlers) => this.call('patch', path, handlers, { secured: true });
}
