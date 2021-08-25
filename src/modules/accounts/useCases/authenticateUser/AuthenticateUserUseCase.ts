/* eslint-disable class-methods-use-this */
import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import AppError from '../../../../shared/infra/http/errors/AppError';
import auth from '../../../../config/auth';
import UsersRepositoryInterface from '../../repositories/UsersRepositoryInterface';
import UsersTokensRepositoryInterface from '../../repositories/UsersTokensRepositoryInterface';
import DateProviderInterface from '../../../../shared/container/providers/DateProvider/DateProviderInterface';

interface RequestInterface {
  email: string;
  password: string;
}

interface ResponseInterface {
  user: { name: string; email: string };
  token: string;
}

@injectable()
export default class AuthenticateUserUseCase {
  private usersRepository: UsersRepositoryInterface;
  private usersTokensRepository: UsersTokensRepositoryInterface;
  private dayjsDateProvider: DateProviderInterface;

  constructor(
    @inject('UsersRepository')
    usersRepository: UsersRepositoryInterface,
    @inject('UsersTokensRepository')
    usersTokensRepository: UsersTokensRepositoryInterface,
    @inject('DayjsDateProvider')
    dayjsDateProvider: DateProviderInterface
  ) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dayjsDateProvider = dayjsDateProvider;
  }

  async execute({
    email,
    password,
  }: RequestInterface): Promise<ResponseInterface> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password as string);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id as string,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id as string,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      user_id: user.id as string,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    const userToken = {
      user: { name: user.name, email: user.email },
      token,
      refresh_token,
    };

    return userToken;
  }
}
