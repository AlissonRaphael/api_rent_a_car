import { getRepository, Repository } from 'typeorm';

import CreateUserDTOInterface from '../../../dtos/CreateUserDTOInterface';
import User from '../entities/User';
import UsersRepositoryInterface from '../../../repositories/UsersRepositoryInterface';

export default class UsersRepository implements UsersRepositoryInterface {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    id,
    avatar,
  }: CreateUserDTOInterface): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      id,
      avatar,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }
}
