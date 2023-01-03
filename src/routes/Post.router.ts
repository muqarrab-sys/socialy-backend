import PostController from '@/controllers/Post.controller';
import { PostCreationObject } from '@/dtos/post/Post.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import BaseRouter from './BaseRouter';

class PostRouter extends BaseRouter<PostController> {
  constructor() {
    super(new PostController());
  }

  protected routes(): void {
    this.authorizedGet('/', this.controller.index);
    this.authorizedPost('/', validationMiddleware(PostCreationObject), this.controller.create);
    this.authorizedGet('user_feeds', this.controller.userFeeds);
  }
}

export default PostRouter;
