import { RouteClass } from '@/lib/BaseRoutes';
import DirBuilder from '@/lib/DirBuilder';

class RouteBuilder extends DirBuilder<RouteClass> {
  protected FILE_POSTFIX = ['.routes.ts', '.routes.js'];

  constructor() {
    super(__dirname);
  }
}

export default RouteBuilder;
