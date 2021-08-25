/* eslint-disable class-methods-use-this */
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateUserAvatarUseCase from './UpdateUserAvatarUseCase';

export default class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const avatarFile = request.file!.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ userId, avatarFile });

    return response.status(204).send();
  }
}
