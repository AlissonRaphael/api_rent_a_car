import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/infra/http/errors/AppError';
import Car from '../../infra/typeorm/entities/Car';
import CarsRepositoryInterface from '../../repositories/CarsRepositoryInterface';

interface RequestInterface {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export default class CreateCarUseCase {
  private carsRepository: CarsRepositoryInterface;

  constructor(
    @inject('CarsRepository')
    carsRepository: CarsRepositoryInterface
  ) {
    this.carsRepository = carsRepository;
  }

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: RequestInterface): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists!');
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}
