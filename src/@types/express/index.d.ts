import { Response, Request, NextFunction } from 'express-serve-static-core';
import { UploadApiResponse } from 'cloudinary';
import User from '../../core/domain/entities/User';
// augment the `express-serve-static-core` module
// declare module 'express-serve-static-core' {
//   // first, declare that we are adding a method to `Response` (the interface)
//   interface Response {
//     respondWithData(data: any): this;
//     endWithSuccess(code: number, data: any): void;
//     endWithError(code: number, error: Error): void;
//     // status: (code: number);
//   }

//   // for test
//   interface Request {
//     something: number;
//   }
// }
declare global {
  namespace Express {
    interface Request {
      something: number;
      getUserInfo(): User;
      cloudinaryResult: UploadApiResponse
    }
    interface Response {
      respondWithData(data: any): this;
      endWithSuccess(code: number, data?: any): void;
      endWithError(code: number, msg?: string): void;
    }
  }
}
