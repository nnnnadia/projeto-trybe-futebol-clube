import StatusError from '../utils/StatusError';
import AuthJWT from '../utils/AuthJWT';

export default class AuthJWTService {
  static getTokenRole = (token: string) => {
    try {
      AuthJWT.validateToken(token);
      const { role } = AuthJWT.retrieveTokenData(token);
      return role;
    } catch (error) {
      throw new StatusError(401, 'Unauthorized');
    }
  };
}
