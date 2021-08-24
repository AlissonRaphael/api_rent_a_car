import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/infra/http/errors/AppError';
import Car from '../../infra/typeorm/entities/Car';
import CarsRepositoryInterface from '../../repositories/CarsRepositoryInterface';
import SpecificationsRepositoryInterface from '../../repositories/SpecificationsRepositoryInterface';

interface RequestInterface {
  car_id: string;
  specification_id: string[];
}

@injectable()
export default class CreateCarSpecificationUseCase {
  private carsRepository: CarsRepositoryInterface;
  private specificationRepository: SpecificationsRepositoryInterface;

  constructor(
    @inject('CarsRepository')
    carsRepository: CarsRepositoryInterface,
    @inject('SpecificationRepository')
    specificationRepository: SpecificationsRepositoryInterface
  ) {
    this.carsRepository = carsRepository;
    this.specificationRepository = specificationRepository;
  }

  async execute({ car_id, specification_id }: RequestInterface): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists!');
    }

    const specifications = await this.specificationRepository.findByIds(
      specification_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create({ ...carExists });

    return carExists;
  }
}
