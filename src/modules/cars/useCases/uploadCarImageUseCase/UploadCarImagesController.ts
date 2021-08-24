/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadCarImagesUseCase from './UploadCarImagesUseCase';

interface FilesInterface {
  filename: string;
}

export default class UploadCarImageControlle {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as FilesInterface[] | undefined;

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images!.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}
