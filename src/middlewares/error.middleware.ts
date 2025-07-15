import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = res.statusCode ? res.statusCode : 500;

  res.json({
    status: statusCode,
    message: err.message,
  });

  next();
};

export default errorHandler;
