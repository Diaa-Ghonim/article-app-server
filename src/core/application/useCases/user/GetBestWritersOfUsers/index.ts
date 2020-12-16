import User from '../../../../domain/entities/User';
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository';
import { BaseUseCase } from '../../BaseUseCase';

export default class GetBestWriters extends BaseUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  execute(): Promise<User[]> {
    try {
      return this._userRepository.getBestWriters();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
