/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DevolutionRentalUseCase from './DevolutionRentalUseCase';

export default class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id,
    });

    return response.status(201).json(rental);
  }
}