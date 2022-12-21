import { Dialect, Model } from 'sequelize';
import { ModelCtor, Sequelize, SequelizeOptions } from 'sequelize-typescript';

class BaseDatabase {
  protected db_name: Dialect;
  protected databaseURL: string;

  sequelize: Sequelize;

  async connect(models: Array<string> | Array<ModelCtor>, options: SequelizeOptions = {}) {
    try {
      this.sequelize = new Sequelize(this.databaseURL, { dialect: this.db_name, models, ...options });
      await this.sequelize.authenticate();
      console.log(`Connected to ${this.db_name}`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default BaseDatabase;
