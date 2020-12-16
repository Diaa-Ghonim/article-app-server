import User from '../../../../domain/entities/User';
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository';
import { BaseUseCase } from '../../BaseUseCase';

export default class DecrementRateUser extends BaseUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  execute(username: string): Promise<User> {
    return this._userRepository.decrementRate(username);
  }
}
