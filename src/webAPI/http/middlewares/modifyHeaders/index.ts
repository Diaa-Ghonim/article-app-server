import { Request, Response, NextFunction } from 'express';

const ModifyHeader = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, token'
  );
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('crossorigin', 'true');
  next();
};

export default ModifyHeader;
