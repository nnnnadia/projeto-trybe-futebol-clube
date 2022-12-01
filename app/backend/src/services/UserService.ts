import AuthJWT from '../utils/AuthJWT';
import UserModel from '../database/models/UserModel';
import IUser from '../types/interfaces/IUser';
import StatusError from '../utils/StatusError';

export default class UserService {
  static findUserByEmail = async (email: string): Promise<IUser> => {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (user) return user;
      throw new StatusError(401, 'Incorrect email or password');
    } catch (error) {
      if (error instanceof StatusError) throw error;
      throw new StatusError(500, 'Internal error');
    }
  };

  static login = async (email: string) => {
    const { id, role } = await UserService.findUserByEmail(email);
    const token = AuthJWT.createToken(id, role);
    return token;
  };
}
