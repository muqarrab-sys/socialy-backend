import { UserCreationObject, UserLoginObject, UserUpdatePasswordObject } from '@/dtos/User.dto';
import { ConflictException, NotFoundException } from '@/exceptions/HttpException';
import Secure from '@/helpers/Secure';
import { Handler } from '@/interfaces/express';
import BaseController from '@/lib/BaseController';
import User, { UserCreationAttributes } from '@/models/User.model';

class UserController extends BaseController {
  constructor() {
    super();
  }

  public register: Handler = async (req, res) => {
    const params: UserCreationObject = req.body;

    const userFound = await User.findUserByEmail(params.email.get);
    if (userFound) throw new ConflictException(`This user already exists`);

    await params.password.encode();

    const newUserParams: UserCreationAttributes = {
      ...params,
      email: params.email.get,
      phone: params.phone.get,
      password: params.password.getEncoded,
      dob: params.dob,
      gender: params.gender
    };

    const user = await User.createNewUser(newUserParams);

    res.status(201).json(user);
  };

  public login: Handler = async (req, res) => {
    const { email, password }: UserLoginObject = req.body;

    const user: User = await User.findUserByEmail(email.get);
    if (!user) throw new NotFoundException(`This user does not exist`);

    const isPasswordMatch: boolean = await password.compare(user.password);
    if (!isPasswordMatch) throw new NotFoundException(`Invalid password`);

    const token: string = Secure.jwtToken({ userId: user.id });

    res.status(200).json({ user, token });
  };

  public updatePassword: Handler = async (req, res) => {
    const { password, newPassword }: UserUpdatePasswordObject = req.body;

    const isPasswordMatch: boolean = await password.compare(req.currentUser.password);
    if (!isPasswordMatch) throw new NotFoundException(`Invalid password`);

    req.currentUser.password = await newPassword.encode();
    await req.currentUser.save();

    res.status(200).json({ message: 'Password updated successfully', success: true });
  };

  public updateProfile: Handler = async (req, res) => {};

  public profile: Handler = async (req, res) => {};
}

export default UserController;
