import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import AppError from '../../../../shared/infra/http/errors/AppError';
import UsersRepositoryInterface from '../../repositories/UsersRepositoryInterface';
import CreateUserDTOInterface from '../../dtos/CreateUserDTOInterface';

@injectable()
export default class CreateUserUseCase {
  private usersRepository: UsersRepositoryInterface;

  constructor(
    @inject('UsersRepository')
    usersRepository: UsersRepositoryInterface
  ) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
    driver_license,
  }: CreateUserDTOInterface): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}
