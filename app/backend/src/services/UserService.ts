import AuthJWT from '../utils/AuthJWT';
import UserModel from '../database/models/UserModel';
import IUser from '../types/interfaces/IUser';

export default class UserService {
  static findUserByEmail = async (email: string): Promise<IUser> => {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (user) return user;
      throw new Error('USER_NOT_FOUND');
    } catch (error) {
      throw new Error('INTERNAL_ERROR');
    }
  };

  static login = async (email: string) => {
    const { id, role } = await UserService.findUserByEmail(email);
    const token = AuthJWT.createToken(id, role);
    return token;
  };
}
