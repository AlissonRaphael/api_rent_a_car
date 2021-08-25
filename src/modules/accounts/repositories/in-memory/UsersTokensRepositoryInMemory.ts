import CreateUsersTokensInterface from '../../dtos/CreateUsersTokensInterface';
import UserTokens from '../../infra/typeorm/entities/UserTokens';
import UsersTokensRepositoryInterface from '../UsersTokensRepositoryInterface';

export default class UsersTokensRepository
  implements UsersTokensRepositoryInterface
{
  private repository: UserTokens[];

  constructor() {
    this.repository = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: CreateUsersTokensInterface): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.repository.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    return this.repository.find((user_token) => {
      return (
        user_token.user_id === user_id &&
        user_token.refresh_token === refresh_token
      );
    });
  }

  async deleteById(id: string): Promise<void> {
    const newUsersTokens = this.repository.filter((user_token) => {
      return !(user_token.id === id);
    });
    this.repository = newUsersTokens;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.repository.find(
      (user_token) => user_token.refresh_token === refresh_token
    ) as UserTokens;
  }
}
