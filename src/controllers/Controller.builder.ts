import DirBuilder from '@/lib/DirBuilder';
import BaseController from '@/lib/BaseController';

class ControllersBuilder extends DirBuilder<BaseController> {
  FILE_POSTFIX = ['.controller.ts', '.controller.js'];

  constructor() {
    super(__dirname);
  }
}

export default ControllersBuilder;
