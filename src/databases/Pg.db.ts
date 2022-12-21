import BaseDatabase from './BaseDatabase';

class PostgresDb extends BaseDatabase {
  private static _instance: PostgresDb = null;

  constructor() {
    super();
    this.db_name = 'postgres';
    this.databaseURL = process.env.POSTGRES_URL;
  }

  static get instance(): PostgresDb {
    if (this._instance === null) {
      this._instance = new PostgresDb();
    }

    return this._instance;
  }
}

export { PostgresDb };
export default PostgresDb.instance;
