import User from '../../entities/User';
import { IEditUser } from './IEditUser';

export default interface IUserRepository {
  generateTemporaryUUID(): string;
  generateUsername(username: string): Promise<string>;
  createUser(user: User): Promise<User>;
  updateUser(data: IEditUser): Promise<User>;
  followUser(followedUsername: string, user: User): Promise<User>;
  unfollowUser(followedUsername: string, user: User): Promise<User>;
  signin(email: string, password: string): Promise<User>;
  deleteUser(username: string): Promise<boolean>;
  logout(): Promise<string>;
  incrementRate(username: string): Promise<User>;
  decrementRate(username: string): Promise<User>;
  getUser(username: string): Promise<User>;
  getBestWriters(): Promise<User[]>;
}
