import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { ModelCtor } from 'sequelize-typescript';
import configs from './configs';
import postgresDb from './databases/Pg.db';
import HttpException from './exceptions/HttpException';
import { isDevelopment } from './helpers/common';
import BaseRouter from './routes/BaseRouter';
import logger from './utils/logger';

class App {
  express: express.Application;
  private port: string | number;

  constructor(private readonly routers: Array<BaseRouter>, private readonly models: Array<ModelCtor>) {
    this.express = express();
    this.port = configs.port || 3001;
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandlers();
  }

  async start() {
    const pgDb = await postgresDb.connect(this.models);
    // await pgDb.sync();

    this.express.listen(this.port, () => {
      console.log(`=> Node version ${process.version}, Platform: ${process.arch} (${process.platform})`);
      console.log(`=> Environment: ${configs.environment}`);
      console.log(`=> Listening to: ${this.port}`);
      console.log(`=> Start time:  ${new Date().toISOString()}`);
      console.log(`=> Press CTRL-C to stop`);
    });
  }

  private initMiddlewares(): void {
    this.express.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private initRoutes(): void {
    this.routers.forEach(r => this.express.use('/', r.router));
  }

  private initErrorHandlers(): void {
    this.express.use((err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
      if (err.stack) logger.error(err.stack);

      const error: { message: string; stack?: any } = { message: err.message || 'Something broke!' };
      if (isDevelopment()) error.stack = err.stack;

      res.status(err.status || 500).json(error);
    });
  }
}

export default App;
