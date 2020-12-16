import IUserRepository from '../../../../domain/interfaces/user/IUserRepository';
import { BaseUseCase } from '../../BaseUseCase';

export default class DeleteUser extends BaseUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  execute(username: string): Promise<boolean> {
    return this._userRepository.deleteUser(username);
  }
}
