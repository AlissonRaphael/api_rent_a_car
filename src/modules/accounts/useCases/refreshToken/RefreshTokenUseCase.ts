import { inject, injectable } from 'tsyringe';
import { verify, sign } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import AppError from '../../../../shared/infra/http/errors/AppError';
import UsersTokensRepositoryInterface from '../../repositories/UsersTokensRepositoryInterface';
import DateProviderInterface from '../../../../shared/container/providers/DateProvider/DateProviderInterface';

interface PayloadInterface {
  sub: string;
  email: string;
}

interface TokenResponseInterface {
  token: string;
  refresh_token: string;
}

@injectable()
export default class RefreshTokenUseCase {
  private usersTokensRepository: UsersTokensRepositoryInterface;
  private dayjsDateProvider: DateProviderInterface;

  constructor(
    @inject('UsersTokensRepository')
    usersTokensRepository: UsersTokensRepositoryInterface,
    @inject('DayjsDateProvider')
    dayjsDateProvider: DateProviderInterface
  ) {
    this.usersTokensRepository = usersTokensRepository;
    this.dayjsDateProvider = dayjsDateProvider;
  }

  async execute(token: string): Promise<TokenResponseInterface> {
    const { email, sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as PayloadInterface;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id as string);

    const expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days
    );

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return { token: newToken, refresh_token };
  }
}
