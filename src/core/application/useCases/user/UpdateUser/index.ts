import User from '../../../../domain/entities/User';
import { ErrorHandler } from '../../../../domain/errorHandling';
import { IEditUser } from '../../../../domain/interfaces/user/IEditUser';
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository';
import { userValidator } from '../../../../domain/validaions/userValidator';
import { BaseUseCase } from '../../BaseUseCase';

export default class UpdateUser extends BaseUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  execute({ username, profImage, name, bio, birthDay, birthMonth, birthYear }: IEditUser): Promise<User> {

    // if (!userValidator.validateProfImage(profImage)) {
    //   throw new ErrorHandler(400, 'prof image should be string');
    // }
    console.log({ username, profImage, name, bio, birthDay, birthMonth, birthYear }, 'use case');

    if (!userValidator.validateFullname(name)) {
      throw new ErrorHandler(400, 'name not exist or not string');
    }

    if (!userValidator.validateDateOfBirth({ birthDay, birthMonth, birthYear })) {
      throw new ErrorHandler(400, 'date of birth not exist or inner values not correct');
    }

    if (!userValidator.validateBio(bio)) {
      throw new ErrorHandler(400, 'bio not correct');
    }

    if (!userValidator.validateUsername(username)) {
      throw new ErrorHandler(400, 'username not exist or not correct');
    }
    return this._userRepository.updateUser({ username, profImage, name, bio, birthDay, birthMonth, birthYear });
  }
}
