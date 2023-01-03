import { Optional } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import User from './User.model';

interface PostAttributes {
  id: string;
  content: string;
  userId: string;
  //   tags: string[];
  //   media: string[];
}

export interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

@Table
export default class Post extends Model<PostAttributes, PostCreationAttributes> {
  @PrimaryKey @Column id: string;
  @Column content: string;

  @ForeignKey(() => User) @Column userId: string;
  @BelongsTo(() => User) user: User;

  static async createNewPost(params: PostCreationAttributes) {
    const post = new Post();
    post.id = uuid();
    params.content && (post.content = params.content);
    params.userId && (post.userId = params.userId);

    return await post.save();
  }

  static async findPostById(id: string): Promise<Post> {
    return await Post.findByPk(id);
  }

  static async findPostsByUserId(userId: string) {
    return await Post.findAll({ where: { userId } });
  }
}
