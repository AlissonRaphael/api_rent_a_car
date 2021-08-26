/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/infra/http/errors/AppError';

import Rental from '../../infra/typeorm/entities/Rental';
import RentalsRepositoryInterface from '../../repositories/RentalsRepositoryInterface';
import CarsRepositoryInterface from '../../../cars/repositories/CarsRepositoryInterface';
import DateProviderInterface from '../../../../shared/container/providers/DateProvider/DateProviderInterface';

interface RequestInterface {
  id: string;
  user_id: string;
}

@injectable()
export default class DevolutionRentalUseCase {
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

  async execute({ id, user_id }: RequestInterface): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental does not exists.');
    }

    const car = await this.carsRepository.findById(rental.car_id);
    const minimumDaily = 1;

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= minimumDaily) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      this.dateProvider.dateNow(),
      rental.expected_return_date
    );

    let total = 0;
    if (delay > 0) {
      const calculateFine = delay * car!.fine_amount;
      total = calculateFine;
    }

    total += daily * car!.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(rental.car_id, true);

    return rental;
  }
}
