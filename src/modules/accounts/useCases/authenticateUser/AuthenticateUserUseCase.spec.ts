import 'reflect-metadata';
import AppError from '../../../../shared/infra/http/errors/AppError';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';
import CreateUserUseCase from '../createUser/CreateUserUseCase';
import CreateUserDTOInterface from '../../dtos/CreateUserDTOInterface';
import DateProviderInterface from '../../../../shared/container/providers/DateProvider/DateProviderInterface';
import DayjsDateProvider from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '../../repositories/in-memory/UsersTokensRepositoryInMemory';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DateProviderInterface;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: CreateUserDTOInterface = {
      name: 'User Test',
      email: 'user@test.com',
      password: '12345',
      driver_license: '5905938',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@gmail.com',
        password: '12345',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: CreateUserDTOInterface = {
      name: 'User Test',
      email: 'user@test.com',
      password: '12345',
      driver_license: '5905938',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '98765',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
