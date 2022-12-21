abstract class BaseModel {
  tableName: string;

  constructor() {}

  defineTableFields() {
    
  }

  static get tableName() {
    return this.name.toLowerCase() + 's';
  }
}

export default BaseModel;
