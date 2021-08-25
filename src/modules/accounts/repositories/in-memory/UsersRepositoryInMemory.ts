import { v4 as uuidV4 } from 'uuid';

import CreateUserDTOInterface from '../../dtos/CreateUserDTOInterface';
import User from '../../infra/typeorm/entities/User';
import UsersRepositoryInterface from '../UsersRepositoryInterface';

export default class UsersRepositoryInMemory
  implements UsersRepositoryInterface
{
  private repository: User[];

  constructor() {
    this.repository = [];
  }

  async create({
    name,
    email,
    password,
    driver_license,
    id,
    avatar,
  }: CreateUserDTOInterface): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
      id: id || uuidV4(),
      avatar,
    });

    this.repository.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.find((item) => item.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.find((item) => item.id === id);
  }
}
