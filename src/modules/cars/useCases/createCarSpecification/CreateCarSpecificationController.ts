/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

export default class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specification_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: id,
      specification_id,
    });

    return response.status(200).json(specificationCars);
  }
}
