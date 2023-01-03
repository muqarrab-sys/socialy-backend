import DirBuilder from '@/lib/DirBuilder';
import BaseRouter from '@/routes/BaseRouter';
import fs from 'fs';

class RoutersBuilder extends DirBuilder<BaseRouter> {
  constructor() {
    super();
    this.FILE_POSTFIX = ['.router.ts', '.router.js'];
    this.build(__dirname);
  }

  protected build(dir: string): void {
    fs.readdirSync(dir).forEach(file => {
      const filePath = `${dir}/${file}`;

      if (fs.statSync(filePath).isDirectory()) {
        this.build(filePath);
      } else if (this.FILE_POSTFIX.some(postfix => file.endsWith(postfix))) {
        const Klass = require(filePath).default;

        let route: Array<string> | string = filePath.replace(__dirname, '').split('/');
        route = route.slice(1, route.length - 1).join('/');

        this.modulesArray.push(new Klass(route));
      }
    });
  }
}

export default RoutersBuilder;
