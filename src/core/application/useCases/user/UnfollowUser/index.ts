

import User from '../../../../domain/entities/User';
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository';
import { BaseUseCase } from '../../BaseUseCase';

export default class UnfollowUser extends BaseUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  execute(unfollowedUsername: string, mainUser: User): Promise<User> {
    return this._userRepository.unfollowUser(unfollowedUsername, mainUser);
  }
}
