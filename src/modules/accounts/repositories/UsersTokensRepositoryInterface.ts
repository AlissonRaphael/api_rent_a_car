import CreateUsersTokensInterface from '../dtos/CreateUsersTokensInterface';
import UserTokens from '../infra/typeorm/entities/UserTokens';

export default interface UsersTokensRepositoryInterface {
  create(data: CreateUsersTokensInterface): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}
