import { BaseController } from '../BaseController';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../../../infrastructure/db/repositories/user';
import { generateToken } from '../../middlewares/authToken';
import { mapToPlainObject } from '../../../../infrastructure/db/helper/map.helpers';
import {
  CreateUser,
  DeleteUser,
  Signin,
  DecrementRateUser,
  IncrementRateUser,
  GetUser,
  GetBestWritersOfUsers,
  UpdateUser,
  LogoutUser,
  FollowUser,
  UnfollowUser
} from '../../../../core/application/useCases/user';

export default new (class UserController extends BaseController {
  constructor() {
    super();
  }

  async createUser(request: Request, response: Response, next: NextFunction) {

    try {
      const body = request.body;
      const createUser = new CreateUser(new UserRepository());
      const businessUser = await createUser.execute(body);
      const plainUser = mapToPlainObject(businessUser);
      const token = await generateToken(plainUser);
      response.endWithSuccess(201, { user: plainUser, token });
    } catch (error) {
      next(error);
    }
  }

  async signin(request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body;
      const login = new Signin(new UserRepository());
      const businessUser = await login.execute(body);
      const plainUser = mapToPlainObject(businessUser);
      const token = await generateToken(plainUser);
      response.endWithSuccess(201, { user: plainUser, token });
    } catch (error) {
      next(error);
    }
  }

  async logout(reguest: Request, response: Response, next: NextFunction) {
    /**
     * very important Tip
     *
     * instead of using logout and jwt doesn't have method to destroy token
     * so we will remove token from cliend by clear it from cookie
     * we can use jwt-redis instead because it contains addition method to destroy token
     * but now we will use jwt temporary
     *
     *
     */

    try {
      const logoutUser = new LogoutUser(new UserRepository());
      await logoutUser.execute();
      response.endWithSuccess(201);
    } catch (error) {
      next(error);
    }
  }

  async checkUserAuth(request: Request, response: Response) {
    /**here if user authenticate true, middleware auth will path request to this 
     * func with user data so we will send this data to client from here
     */
    try {
      const { username } = request.getUserInfo();
      const getUser = new GetUser(new UserRepository());
      const businessUser = await getUser.execute(username);
      const plainUser = mapToPlainObject(businessUser);
      response.endWithSuccess(201, plainUser);
    } catch (error) {

    }
  }

  async updateUser(request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body;
      // const files = request.files as Express.Multer.File[];
      // if (files.length) {
      //   body.profImage = files[0].filename;
      // }
      const cloudinaryResult = request.cloudinaryResult;
      if (cloudinaryResult) {
        const { url } = cloudinaryResult;
        body.profImage = url;
      }
      console.log(body, 'body');
      const updateUser = new UpdateUser(new UserRepository());
      const businessUser = await updateUser.execute(body);
      const plainUser = mapToPlainObject(businessUser);
      response.endWithSuccess(201, plainUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(request: Request, response: Response, next: NextFunction) {
    try {
      const { username } = request.params;
      const deleteUser = new DeleteUser(new UserRepository());
      const isDeleted = await deleteUser.execute(username);
      response.endWithSuccess(201, isDeleted);
    } catch (error) {
      next(error);
    }
  }

  async follow(request: Request, response: Response, next: NextFunction) {
    try {
      const { followedUsername } = request.body;
      // console.log(followedUsername);
      const mainUser = request.getUserInfo();
      const followUser = new FollowUser(new UserRepository());
      const businessUser = await followUser.execute(followedUsername, mainUser);
      const plainUser = mapToPlainObject(businessUser);
      response.endWithSuccess(201, plainUser);
    } catch (error) {
      next(error);
    }
  }

  async unfollow(request: Request, response: Response, next: NextFunction) {
    try {
      const { unfollowedUsername } = request.body;
      const mainUser = request.getUserInfo();
      const unfollowUser = new UnfollowUser(new UserRepository());
      const businessUser = await unfollowUser.execute(unfollowedUsername, mainUser);
      const plainUser = mapToPlainObject(businessUser);
      response.endWithSuccess(201, plainUser);
    } catch (error) {
      next(error);
    }
  }

  async incrementRateUser(request: Request, response: Response, next: NextFunction) {
    try {
      const { username } = request.params;
      const incrementRateUser = new IncrementRateUser(new UserRepository());
      const businessUser = await incrementRateUser.execute(username);
      const plainUser = mapToPlainObject(businessUser);
      response.endWithSuccess(201, plainUser);
    } catch (error) {
      next(error);
    }
  }

  async decrementRateUser(request: Request, response: Response, next: NextFunction) {
    try {
      const { username } = request.params;
      const decrementRateUser = new DecrementRateUser(new UserRepository());
      const businessUser = await decrementRateUser.execute(username);
      const plainUser = mapToPlainObject(businessUser);
      response.endWithSuccess(201, plainUser);
    } catch (error) {
      next(error);
    }
  }

  async getUser(request: Request, response: Response, next: NextFunction) {
    try {
      const { username } = request.params;
      const getUser = new GetUser(new UserRepository());
      const businessUser = await getUser.execute(username);
      const plainUser = mapToPlainObject(businessUser);
      response.endWithSuccess(201, plainUser);
    } catch (error) {
      next(error);
    }
  }

  async getBestWriters(request: Request, response: Response, next: NextFunction) {
    try {
      const getBestWriters = new GetBestWritersOfUsers(new UserRepository());
      let businessBestWritersArray = await getBestWriters.execute();
      let plainBestWritersArray = businessBestWritersArray.map(businessBestWriter => mapToPlainObject(businessBestWriter));
      response.endWithSuccess(201, plainBestWritersArray);
    } catch (error) {
      next(error);
    }
  }
})();
