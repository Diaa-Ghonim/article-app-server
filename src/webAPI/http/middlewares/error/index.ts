import { NextFunction, Request, Response } from 'express';
import { ErrorHandler, handleError } from '../../../../core/domain/errorHandling';
export const errorMiddleware = (error: ErrorHandler, request: Request, response: Response, next: NextFunction) => {
  console.log(error);
  console.log(error.message);
  console.log(Object.getPrototypeOf(error));
  console.log(ErrorHandler.prototype);
  console.log(Object.getPrototypeOf(error) === ErrorHandler.prototype, 'instance');
  console.log(error instanceof Error, 'instance 2');
  if (error instanceof ErrorHandler) {
    return handleError(error, response);
  }

  response.status(500).json({ message: 'internal server errror, please try again !!' });
}
