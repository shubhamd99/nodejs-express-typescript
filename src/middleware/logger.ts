import { Application, Request, Response, NextFunction } from 'express';
import moment from 'moment';
import colors from 'colors';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    colors.cyan(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`)
  );
  // http://localhost:5000/ :  2019-06-23T21:18:43+05:30
  next();
};

export default logger;
