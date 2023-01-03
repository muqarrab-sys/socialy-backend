import { PostCreationObject } from '@/dtos/post/Post.dto';
import { Handler } from '@/interfaces/express';
import BaseController from '@/lib/BaseController';
import Post from '@/models/Post.model';
import User from '@/models/User.model';

class PostController extends BaseController {
  constructor() {
    super();
  }

  public index: Handler = async (req, res) => {
    const { id: userId } = req.currentUser;

    const posts = await Post.findPostsByUserId(userId);

    res.status(200).json(posts);
  };

  public create: Handler = async (req, res) => {
    const { id: userId } = req.currentUser;
    const { content }: PostCreationObject = req.body;

    await Post.createNewPost({ content, userId });

    res.status(201).json({ message: 'Post created successfully', success: true });
  };

  public userFeeds: Handler = async (req, res) => {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['profilePic', 'id', 'name'],
      },
    });

    res.status(200).json(posts);
  };
}

export default PostController;
