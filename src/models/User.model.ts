import { GenderEnum } from '@/dtos/User.dto';
import { Optional } from 'sequelize';
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import Post from './Post.model';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: Date;
  gender: GenderEnum;
  profilePic: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'profilePic'> {}

@Table
class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey @Column id: string;
  @Column name: string;
  @Column email: string;
  @Column password: string;
  @Column phone: string;
  @Column dob: Date;
  @Column({ type: DataType.ENUM(...Object.values(GenderEnum)) }) gender: GenderEnum;
  @Column profilePic: string;

  // @HasMany(() => User) friends: User[];
  // @HasMany(() => User) friendRequests: User[];

  @HasMany(() => Post) posts: Post[];
  @HasMany(() => Post) likedPosts: Post[];

  get age() {
    return new Date().getFullYear() - this.dob.getFullYear();
  }

  static async createNewUser(params: UserCreationAttributes) {
    const user = new User();
    user.id = uuid();
    params.name && (user.name = params.name);
    params.email && (user.email = params.email);
    params.password && (user.password = params.password);
    params.phone && (user.phone = params.phone);
    params.dob && (user.dob = params.dob);
    params.gender && (user.gender = params.gender);

    return await user.save();
  }

  static async findUserById(id: number): Promise<User> {
    return await User.findByPk(id);
  }

  static async findUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  static async findUserByPhone(phone: string) {
    return await User.findOne({ where: { phone } });
  }
}

export default User;
