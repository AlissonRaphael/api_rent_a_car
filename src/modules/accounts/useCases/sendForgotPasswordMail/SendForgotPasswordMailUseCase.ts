import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';
import { resolve } from 'path';

import AppError from '../../../../shared/infra/http/errors/AppError';

import UsersRepositoryInterface from '../../repositories/UsersRepositoryInterface';
import UsersTokensRepositoryInterface from '../../repositories/UsersTokensRepositoryInterface';
import DateProviderInterface from '../../../../shared/container/providers/DateProvider/DateProviderInterface';
import MailProviderInterface from '../../../../shared/container/providers/MailProvider/MailProviderInterface';

@injectable()
export default class SendForgotPasswordMailUseCase {
  private usersRepository: UsersRepositoryInterface;
  private usersTokensRepository: UsersTokensRepositoryInterface;
  private dayjsDateProvider: DateProviderInterface;
  private etherealMailProvider: MailProviderInterface;

  constructor(
    @inject('UsersRepository')
    usersRepository: UsersRepositoryInterface,
    @inject('UsersTokensRepository')
    usersTokensRepository: UsersTokensRepositoryInterface,
    @inject('DayjsDateProvider')
    dayjsDateProvider: DateProviderInterface,
    @inject('EtherealMailProvider')
    etherealMailProvider: MailProviderInterface
  ) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dayjsDateProvider = dayjsDateProvider;
    this.etherealMailProvider = etherealMailProvider;
  }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const token = uuidV4();

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id as string,
      expires_date: this.dayjsDateProvider.addHours(3),
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.etherealMailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath
    );
  }
}
