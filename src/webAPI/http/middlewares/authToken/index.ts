/**
 * here we can use jwt-redis , it contains additional methods as destroy
 *
 *
 * This library (jwt-redis) completely repeats the entire functionality of the library jsonwebtoken,
 * with one important addition. Jwt-redis allows you to store the token label in redis to verify
 * validity. The absence of a token label in redis makes the token not valid. To destroy the token in
 * jwt-redis, there is a destroy method
 * it works in this way :
 *
 * 1) Install jwt-redis from npm
 *
 * 
2) To Create -

* var JWTR =  require('jwt-redis').default;
* var redis = require('redis');
* var redisClient = redis.createClient();
* var jwtr = new JWTR(redisClient);

 jwtr.sign(payload, secret)
    .then((token)=>{
            // your code
    })
    .catch((error)=>{
            // error handling
    });
  3) To verify -

  jwtr.verify(token, secret);
  4) To Destroy -

  jwtr.destroy(token)

  
 */

import * as JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../../../../core/domain/entities/User';
import { handleError, ErrorHandler } from '../../../../core/domain/errorHandling';

const accessTokenSecret = 'youraccesstokensecret';

export const generateToken = async (user: User) => {
  try {
    const token = JWT.sign(user, accessTokenSecret, {
      expiresIn: '1000h',
      // algorithm: 'RS256',
    });
    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject('something wrong with jwt !!');
  }
};

export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    // return handleError(new ErrorHandler(401, 'Not Token Exist'), response);
    throw new ErrorHandler(401, 'Not Token Exist');
    // return response.sendStatus(401);
  }

  JWT.verify(token, accessTokenSecret, function (err, decoded: any) {
    if (err) {
      // return handleError(new ErrorHandler(403, err.message), response);
      throw new ErrorHandler(403, err.message);
      // return response.status(403).json(err.message);
    }
    request.getUserInfo = (): User => {
      return decoded;
    };
    next();
  });
};
