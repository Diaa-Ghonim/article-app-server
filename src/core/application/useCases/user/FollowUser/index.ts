
import User from '../../../../domain/entities/User';
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository';
import { BaseUseCase } from '../../BaseUseCase';

export default class FollowUser extends BaseUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  execute(followedUsername: string, mainUser: User): Promise<User> {
    return this._userRepository.followUser(followedUsername, mainUser);
  }
}
