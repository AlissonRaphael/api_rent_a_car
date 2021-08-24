import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import connection from '../typeorm';
import '../../container';

import swaggerSetupFile from '../../../swagger.json';
import router from './routes';
import AppError from './errors/AppError';

connection();
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSetupFile));
app.use(router);
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    console.log(err.name, err.message, err.stack);

    return response.status(500).json({
      status: 'error',
      message: `Interval server error: ${err.message}`,
    });
  }
);

export default app;
