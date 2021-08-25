import CreateUserDTOInterface from '../dtos/CreateUserDTOInterface';
import User from '../infra/typeorm/entities/User';

export default interface UsersRepositoryInterface {
  create(data: CreateUserDTOInterface): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
