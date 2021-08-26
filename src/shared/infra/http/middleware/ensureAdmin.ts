import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

import UsersRepository from '../../../../modules/accounts/infra/typeorm/repository/UsersRepository';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user?.is_admin) {
    throw new AppError('User is not admin!');
  }

  next();
}
