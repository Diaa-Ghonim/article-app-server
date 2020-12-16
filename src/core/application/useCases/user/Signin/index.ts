import User from '../../../../domain/entities/User';
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository';
import { BaseUseCase } from '../../BaseUseCase';
import { userValidator } from '../../../../domain/validaions/userValidator';
import { ErrorHandler } from '../../../../domain/errorHandling';

export default class Signin extends BaseUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  execute({ email, password }: any): Promise<User> {
    try {
      if (!userValidator.validateEmail(email)) {
        throw new ErrorHandler(400, 'Email invalid.');
      }
      if (!userValidator.validatePassword(password)) {
        throw new ErrorHandler(400, 'password not exist or not valid')
      }
      return this._userRepository.signin(email, password);
    } catch (error) {
      return Promise.reject(error);
    }

  }
}
