import DirBuilder from '@/lib/DirBuilder';
import { Model } from 'sequelize';

class ModelsBuilder extends DirBuilder<Model> {
  constructor() {
    super();
    this.FILE_POSTFIX = ['.model.ts', '.model.js'];
    this.build(__dirname);
  }
}

export default ModelsBuilder;
