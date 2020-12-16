import User from '../../../../domain/entities/User';
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository';
import { BaseUseCase } from '../../BaseUseCase';

export default class LogoutUser extends BaseUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  async execute(): Promise<string> {
    return this._userRepository.logout();
  }
}
