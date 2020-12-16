import { Response, Request, NextFunction } from 'express-serve-static-core';

const EndWith = (req: Request, res: Response, next: NextFunction) => {
  req.something = 1000;
  res.endWithSuccess = (code, data?: any) => {
    res.status(code);
    if (data) {
      res.json(data);
    } else {
      res.end();
    }
  };

  res.endWithError = (code = 400, msg?: string) => {
    res.status(code).json({ msg });
  };

  next();
};

export default EndWith;
