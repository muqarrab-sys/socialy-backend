import { Dialect } from 'sequelize';
import { ModelCtor, Sequelize, SequelizeOptions } from 'sequelize-typescript';

class BaseDatabase {
  protected db_name: Dialect;
  protected databaseURL: string;

  sequelize: Sequelize;

  async connect(models: Array<string> | Array<ModelCtor>, options: SequelizeOptions = {}): Promise<Sequelize> {
    try {
      if (this.sequelize) return this.sequelize;

      this.sequelize = new Sequelize(this.databaseURL, { dialect: this.db_name, models, ...options });
      await this.sequelize.authenticate();
      console.log(`Connected to ${this.db_name}`);
      return this.sequelize;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to connect to ${this.db_name}`);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      this.sequelize = null;
      console.log(`Disconnected from ${this.db_name}`);
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to disconnect from ${this.db_name}`);
    }
  }
}

export default BaseDatabase;
