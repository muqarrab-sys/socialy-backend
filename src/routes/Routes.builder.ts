import { RouteClass } from '@/lib/BaseRoutes';
import DirBuilder from '@/lib/DirBuilder';

class RouteBuilder extends DirBuilder<RouteClass> {
  constructor() {
    super();
    this.FILE_POSTFIX = ['.routes.ts', '.routes.js'];
    this.build(__dirname);
  }
}

export default RouteBuilder;
