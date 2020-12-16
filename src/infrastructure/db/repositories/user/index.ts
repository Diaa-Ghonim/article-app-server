import IUserRepository from '../../../../core/domain/interfaces/user/IUserRepository';
import User from '../../../../core/domain/entities/User';
import { EntityUser } from '../../entities/user';
import { getRepository, MoreThan } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { mapToBusinessEntity, mapToTypeormEntity } from '../../helper/map.helpers';
import { ErrorHandler } from '../../../../core/domain/errorHandling';
import { IEditUser } from '../../../../core/domain/interfaces/user/IEditUser';

export default class UserRepository implements IUserRepository {
  private saltRounds: number;
  private userRepo: any;/** get type of it from type orm  */
  constructor() {
    this.saltRounds = 10;
    this.userRepo = getRepository(EntityUser);
  }

  generateTemporaryUUID(): string {
    return uuidv4();
  }

  async generateUsername(username: string): Promise<string> {
    try {
      let editedUsername = username.split(" ").join('.');
      /** this varable because generateUsername Method return Promise 
       * so i can't reassign editedUsername variable again when i recrusive 
       * generateeUsername method because editedUsername variable is string
      */
      let usernameGenerated;
      const user = await this.userRepo.findOne({ username: editedUsername });
      if (user) {
        usernameGenerated = this.generateUsername(editedUsername + Math.floor(Math.random() * 100));
      }
      return Promise.resolve(usernameGenerated || editedUsername);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const isUserExist = await this.userRepo.findOne({
        email: user.email,
      });

      if (isUserExist) {
        throw new ErrorHandler(400, 'This email is already exist');
      }
      const hashedPassword = await bcrypt.hash(user.password, this.saltRounds);
      user.password = hashedPassword;
      const userTypeormEntity = mapToTypeormEntity(EntityUser, user);
      const savedUser = await this.userRepo.save(userTypeormEntity);
      const userBusinessEntity = mapToBusinessEntity(User, savedUser);
      return Promise.resolve(userBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signin(email: string, password: string): Promise<User> {
    try {
      const userTypeormEntityResult = await this.userRepo.findOne({ email: email });
      if (!userTypeormEntityResult) {
        throw new ErrorHandler(404, 'User with the specified email does not exists');
      }
      const matchPassword = await bcrypt.compare(password, userTypeormEntityResult.password);
      if (!matchPassword) {
        throw new ErrorHandler(400, 'Password wrong !!');

      }
      const userBusinessEntity = mapToBusinessEntity(User, userTypeormEntityResult);
      return Promise.resolve(userBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateUser(user: IEditUser): Promise<User> {
    try {
      /**
       * some thing we should doing here about update
       */
      const userTypeormEntityResult = await this.userRepo.findOne({ username: user.username });
      const dateOfBirth = {
        birthDay: user.birthDay,
        birthMonth: user.birthMonth,
        birthYear: user.birthYear
      }

      userTypeormEntityResult.bio = user.bio;
      userTypeormEntityResult.dateOfBirth = dateOfBirth;
      userTypeormEntityResult.name = user.name;
      if (user.profImage) {
        userTypeormEntityResult.profImage = user.profImage;
      }
      userTypeormEntityResult.username = user.username;
      await this.userRepo.save(userTypeormEntityResult);
      const userBusinessEntity = mapToBusinessEntity(User, userTypeormEntityResult);
      return Promise.resolve(userBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteUser(username: string): Promise<boolean> {
    try {
      await this.userRepo.delete({ username: username });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async followUser(followedUsername: string, user: User): Promise<User> {
    try {
      if (followedUsername === user.username) {
        throw new ErrorHandler(400, "you can't follow yourself.");
      }
      const followedUserTypeormEntityResult = await this.userRepo.findOne({ username: followedUsername });
      const followerUserTypeormEntityResult = await this.userRepo.findOne({ username: user.username });

      // console.log(followedUserTypeormEntityResult, 'followedUserResult');
      // console.log(followerUserTypeormEntityResult, 'unfollowerUserTypeormEntityResult');

      if (!followedUserTypeormEntityResult || !followerUserTypeormEntityResult) {
        throw new ErrorHandler(404, 'followed or follower user not exists.');
      }
      const isMeFollowingHim = followedUserTypeormEntityResult.followers.find(
        (follower: EntityUser) => follower.username === user.username
      );
      // console.log(isMeFollowingHim);

      if (isMeFollowingHim) throw new ErrorHandler(400, 'you already following this user');
      // const followerUserTypeormEntity = mapToTypeormEntity(EntityUser, user);
      // console.log(followerUserTypeormEntity);

      followedUserTypeormEntityResult.followers.push(user);
      await this.userRepo.save(followedUserTypeormEntityResult);
      // console.log(followedUserTypeormEntityResult.followers);

      followerUserTypeormEntityResult.following.push(followedUserTypeormEntityResult);
      await this.userRepo.save(followerUserTypeormEntityResult);
      // console.log(followerUserTypeormEntityResult.following, 'follower');

      const followedUserBusinessEntity = mapToBusinessEntity(User, followedUserTypeormEntityResult);
      return Promise.resolve(followedUserBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }

  }

  async unfollowUser(unfollowedUsername: string, user: User): Promise<User> {
    try {
      if (unfollowedUsername === user.username) {
        throw new ErrorHandler(400, "you can't unfollow yourself.");
      }

      const unfollowedUserTypeormEntityResult = await this.userRepo.findOne({ username: unfollowedUsername });
      const followerUserTypeormEntityResult = await this.userRepo.findOne({ username: user.username });

      // console.log(unfollowedUserTypeormEntityResult, 'unfollowedUserTypeormEntityResult');
      // console.log(followerUserTypeormEntityResult, 'unfollowerUserTypeormEntityResult');

      if (!unfollowedUserTypeormEntityResult || !followerUserTypeormEntityResult) {
        throw new ErrorHandler(404, 'followed user or follower user not exists.');
      };
      const followersArrayFilterd = unfollowedUserTypeormEntityResult.followers.filter(
        (follower: User) => follower.username !== user.username
      );
      console.log(followersArrayFilterd);

      unfollowedUserTypeormEntityResult.followers = followersArrayFilterd;
      await this.userRepo.save(unfollowedUserTypeormEntityResult);
      // console.log(user, 'username');

      const followingArrayFilterd = followerUserTypeormEntityResult.following.filter(
        (following: User) => following.username !== unfollowedUsername
      );
      followerUserTypeormEntityResult.following = followingArrayFilterd;
      // console.log(followerUserTypeormEntityResult, 'follower');

      await this.userRepo.save(followerUserTypeormEntityResult);
      const unfollowedUserBusinessEntity = mapToBusinessEntity(User, unfollowedUserTypeormEntityResult);
      return Promise.resolve(unfollowedUserBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async logout(): Promise<string> {
    /**
     * this until we know what we will do
     */
    return Promise.resolve('logout success');
  }

  async incrementRate(username: string): Promise<User> {
    try {
      const userTypeormEntityResult = await this.userRepo.findOne({ username: username });
      if (!userTypeormEntityResult) throw new ErrorHandler(404, 'this user not found');
      userTypeormEntityResult.rate += 50;
      await this.userRepo.save(userTypeormEntityResult);
      const userBusinessEntity = mapToBusinessEntity(User, userTypeormEntityResult);
      return Promise.resolve(userBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async decrementRate(username: string): Promise<User> {
    try {
      /**
       * note here if rate less than 50 the value of it will be negative value
       */
      const userTypeormEntityResult = await this.userRepo.findOne({ username: username });
      if (!userTypeormEntityResult) throw new ErrorHandler(404, 'this user not found');
      userTypeormEntityResult.rate -= 50;
      await this.userRepo.save(userTypeormEntityResult);
      const userBusinessEntity = mapToBusinessEntity(User, userTypeormEntityResult);
      return Promise.resolve(userBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getUser(username: string): Promise<User> {
    try {
      const userTypeormEntityResult = await this.userRepo.findOne({ username: username });
      if (!userTypeormEntityResult) throw new ErrorHandler(404, 'User you try to get it not found.')
      const userBusinessEntity = mapToBusinessEntity(User, userTypeormEntityResult);
      return Promise.resolve(userBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getBestWriters(): Promise<User[]> {
    try {
      const bestWritersTypeormEntitiesResult = await this.userRepo.find('rate', {
        rate: MoreThan(10),
      });
      const result: User[] = [];
      bestWritersTypeormEntitiesResult.forEach((userTypeormEntity: EntityUser) => {
        const userBusinessEntity = mapToBusinessEntity(User, userTypeormEntity);
        result.push(userBusinessEntity);
      });
      return Promise.resolve(result.slice(0, 3));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
