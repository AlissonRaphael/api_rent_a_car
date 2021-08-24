/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ImportCategoryUseCase from './ImportCategoryUseCase';

export default class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await importCategoryUseCase.execute(file!);

    return response.status(201).send();
  }
}
