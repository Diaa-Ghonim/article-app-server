import User from '../../../../domain/entities/User';
import { ErrorHandler } from '../../../../domain/errorHandling';
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository';
import { userValidator } from '../../../../domain/validaions/userValidator';
import { BaseUseCase } from '../../BaseUseCase';
import { IUser } from '../../../../domain/interfaces/user/IUser';
export default class CreateUser extends BaseUseCase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  async execute({ fullname, email, password, dateOfBirth, gender }: any): Promise<User> {
    try {

      if (!userValidator.validateFullname(fullname)) {
        throw new ErrorHandler(400, 'name not exist or not string');
      }

      if (!userValidator.validateEmail(email)) {
        throw new ErrorHandler(400, 'email invalid');

      }
      if (!userValidator.validatePassword(password)) {
        throw new ErrorHandler(400, 'password not exist or not valid');
      }


      if (!userValidator.validateDateOfBirth(dateOfBirth)) {
        throw new ErrorHandler(400, 'date of birth not exist or inner values not correct');
      }

      if (!userValidator.validateGender(gender)) {
        throw new ErrorHandler(400, 'gender not exist or not correct')
      }

      const ID = this._userRepository.generateTemporaryUUID();
      const username = await this._userRepository.generateUsername(fullname);

      const userInfo = {

        id: ID, /* this id is temporary id */
        name: fullname, /**spread input user data */
        email,
        password,
        dateOfBirth,
        gender,
        dateOfCreate: Date.now(),
        age: 0,/** zero is default value */
        username: username, /** generated in user repo */
        // profImage: 'default-image.png',/** default profile image */
        profImage: 'https://res.cloudinary.com/abo-mandella/image/upload/v1608076477/images/default-image_vftckq.png',
        bio: '', /** default bio */
        rate: 12, /** default rate */
        followers: [],
        following: []
      };

      const user = new User(userInfo);
      return this._userRepository.createUser(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
