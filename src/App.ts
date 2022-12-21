import express from 'express';
import morgan from 'morgan';
import { RouteClass } from './lib/BaseRoutes';
import logger from './utils/logger';

class App {
  express: express.Application;
  private port: string | number;

  constructor(routers: Array<RouteClass>) {
    this.express = express();
    this.port = process.env.PORT || 3000;
    this.initMiddlewares();
    this.initRoutes(routers);
  }

  start(): void {
    this.express.listen(this.port, () => {
      logger.info(`Listening to: ${this.port}`);
    });
  }

  private initMiddlewares(): void {
    this.express.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
    this.express.use(express.json());
  }

  private initRoutes(routers: Array<RouteClass>): void {
    routers.forEach(Router => {
      new Router(this.express).routes();
    });
  }
}

export default App;
