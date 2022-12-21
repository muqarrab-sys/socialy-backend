abstract class BaseModel {
  tableName: string;

  constructor() {}

  protected field(name: string, type: string, options: any = {}) {}

  static get tableName() {
    return this.name.toLowerCase() + 's';
  }
}

export default BaseModel;
