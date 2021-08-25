import 'reflect-metadata';

import AppError from '../../../../shared/infra/http/errors/AppError';
import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

import DayjsDateProvider from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import DateProviderInterface from '../../../../shared/container/providers/DateProvider/DateProviderInterface';
import MailProviderInMemory from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import MailProviderInterface from '../../../../shared/container/providers/MailProvider/MailProviderInterface';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import UsersRepositoryInterface from '../../repositories/UsersRepositoryInterface';
import UsersTokensRepositoryInterface from '../../repositories/UsersTokensRepositoryInterface';
import UsersTokensRepositoryInMemory from '../../repositories/in-memory/UsersTokensRepositoryInMemory';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInterface;
let dateProviderInMemory: DateProviderInterface;
let mailProviderInMemory: MailProviderInterface;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInterface;

describe('Send forgot mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProviderInMemory = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProviderInMemory,
      mailProviderInMemory
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'FirtsName of User',
      email: 'user@server.com',
      password: '111111',
      driver_license: '48859983',
    });

    await sendForgotPasswordMailUseCase.execute('user@server.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('undefined@server.com')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenEmail = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      name: 'FirtsName of User',
      email: 'user@server.com',
      password: '111111',
      driver_license: '48859983',
    });

    await sendForgotPasswordMailUseCase.execute('user@server.com');

    expect(generateTokenEmail).toHaveBeenCalled();
  });
});
