export default interface CreateUsersTokensInterface {
  id?: string;
  user_id: string;
  refresh_token: string;
  expires_date: Date;
}
