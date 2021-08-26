import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shared/infra/http/errors/AppError';

import Rental from '../../infra/typeorm/entities/Rental';
import RentalsRepositoryInterface from '../../repositories/RentalsRepositoryInterface';
import CarsRepositoryInterface from '../../../cars/repositories/CarsRepositoryInterface';
import CreateRentalDTOInterface from '../../dtos/CreateRentalDTOInterface';
import DateProviderInterface from '../../../../shared/container/providers/DateProvider/DateProviderInterface';

@injectable()
export default class CreateRentalUseCase {
  private rentalsRepository: RentalsRepositoryInterface;
  private dateProvider: DateProviderInterface;
  private carsRepository: CarsRepositoryInterface;

  constructor(
    @inject('RentalsRepository')
    rentalsRepository: RentalsRepositoryInterface,
    @inject('DayjsDateProvider')
    dateProvider: DateProviderInterface,
    @inject('CarsRepository')
    carsRepository: CarsRepositoryInterface
  ) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: CreateRentalDTOInterface): Promise<Rental> {
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable!');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError('Theres a rental in progress for user!');
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimumHour) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}
