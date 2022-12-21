import { Optional } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface PersonCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table
class User extends Model<UserAttributes, PersonCreationAttributes> {
  @Column name: string;
  @Column email: string;
  @Column password: string;

  // Static or Self Methods
  static async createNewUser(params: UserAttributes) {
    const user = new User();
    params.name && (user.name = params.name);
    params.email && (user.email = params.email);
    params.password && (user.password = params.password);

    return await user.save();
  }

  static async findUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  static async findUserById(id: number) {
    return await User.findOne({ where: { id } });
  }

  static async findUserByEmailAndPassword(email: string, password: string) {
    return await User.findOne({ where: { email, password } });
  }
}

export default User;
