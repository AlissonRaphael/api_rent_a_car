/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject, injectable } from 'tsyringe';

import deleteFile from '../../../../utils/file';
import UsersRepositoryInterface from '../../repositories/UsersRepositoryInterface';

interface RequestInterface {
  userId: string;
  avatarFile: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
  private usersRepository: UsersRepositoryInterface;

  constructor(
    @inject('UsersRepository')
    usersRepository: UsersRepositoryInterface
  ) {
    this.usersRepository = usersRepository;
  }

  async execute({ userId, avatarFile }: RequestInterface): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (user!.avatar) {
      await deleteFile(`./tmp/avatar/${user!.avatar}`);
    }

    user!.avatar = avatarFile;

    await this.usersRepository.create(user!);
  }
}
