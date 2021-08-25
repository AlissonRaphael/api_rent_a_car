/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/infra/http/errors/AppError';
import DateProviderInterface from '../../../../shared/container/providers/DateProvider/DateProviderInterface';
import CreateUserDTOInterface from '../../dtos/CreateUserDTOInterface';
import UsersRepositoryInterface from '../../repositories/UsersRepositoryInterface';
import UsersTokensRepositoryInterface from '../../repositories/UsersTokensRepositoryInterface';

interface RequestInterface {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordUserUseCase {
  private usersTokensRepository: UsersTokensRepositoryInterface;
  private dayjsDateProvider: DateProviderInterface;
  private usersRepository: UsersRepositoryInterface;

  constructor(
    @inject('UsersTokensRepository')
    usersTokensRepository: UsersTokensRepositoryInterface,
    @inject('DayjsDateProvider')
    dayjsDateProvider: DateProviderInterface,
    @inject('UsersRepository')
    usersRepository: UsersRepositoryInterface
  ) {
    this.usersTokensRepository = usersTokensRepository;
    this.dayjsDateProvider = dayjsDateProvider;
    this.usersRepository = usersRepository;
  }

  async execute({ token, password }: RequestInterface): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!token) {
      throw new AppError('Token invalid!');
    }

    const isExpired = this.dayjsDateProvider.compareIfBefore(
      userToken.expires_date,
      this.dayjsDateProvider.dateNow()
    );

    if (isExpired) {
      throw new AppError('Token expired!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user!.password = await hash(password, 8);

    await this.usersRepository.create(user as CreateUserDTOInterface);

    await this.usersTokensRepository.deleteById(userToken.id as string);
  }
}
