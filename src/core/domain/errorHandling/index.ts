import { Response } from 'express';

export class ErrorHandler extends Error {
  private _statusCode: number;

  private _message: string;

  constructor(statusCode: number, message: string) {
    super();
    this._statusCode = statusCode;
    this._message = message;
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public set statusCode(value: number) {
    this._statusCode = value;
  }

  public get message(): string {
    return this._message;
  }

  public set message(value: string) {
    this._message = value;
  }

}

export const handleError = (error: ErrorHandler, response: Response) => {
  const { statusCode, message } = error;
  response.status(statusCode).json({
    status: 'status',
    statusCode,
    message,
  });
};
