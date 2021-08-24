import { inject, injectable } from 'tsyringe';

import Car from '../../infra/typeorm/entities/Car';
import CarsRepositoryInterface from '../../repositories/CarsRepositoryInterface';

interface RequestInterface {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
export default class ListCarsUseCase {
  private carsRepository: CarsRepositoryInterface;

  constructor(
    @inject('CarsRepository')
    carsRepository: CarsRepositoryInterface
  ) {
    this.carsRepository = carsRepository;
  }

  async execute({
    name,
    brand,
    category_id,
  }: RequestInterface): Promise<Car[] | undefined> {
    const cars = await this.carsRepository.findAvailable(
      name,
      brand,
      category_id
    );

    return cars;
  }
}
