import express from 'express';
import morgan from 'morgan';
import { ModelCtor } from 'sequelize-typescript';
import postgresDb from './databases/Pg.db';
import { RouteClass } from './lib/BaseRoutes';
import logger from './utils/logger';

class App {
  express: express.Application;
  private port: string | number;

  constructor(routers: Array<RouteClass>, models: Array<ModelCtor>) {
    this.express = express();
    this.port = process.env.PORT || 3001;
    this.initMiddlewares();
    this.connectDB(models);
    this.initRoutes(routers);
  }

  start(): void {
    this.express.listen(this.port, () => {
      console.log(`=> Node version ${process.version}, Platform: ${process.arch} (${process.platform})`);
      console.log(`=> Environment: ${process.env.NODE_ENV}`);
      console.log(`=> Listening to: ${this.port}`);
      console.log(`=> Start time:  ${new Date().toISOString()}`);
      console.log(`=> Press CTRL-C to stop`);
    });
  }

  connectDB(models: Array<ModelCtor>): void {
    postgresDb.connect(models);
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
