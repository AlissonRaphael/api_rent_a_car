import 'reflect-metadata';
import dayjs from 'dayjs';

import AppError from '../../../../shared/infra/http/errors/AppError';
import DayjsDateProvider from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import CarsRepositoryInMemory from '../../../cars/repositories/in-memory/CarsRepositoryInMemory';
import CreateRentalUseCase from './CreateRentalUseCase';
import RentalsRepositoryInMemory from '../../repositories/InMemory/RentalsRepositoryInMemory';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let dayAdd24Hours: Date;

describe('Create Rental', () => {
  beforeEach(() => {
    dayAdd24Hours = dayjs().add(1, 'day').toDate();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Carro executivo de luxo',
      daily_rate: 200.0,
      license_plate: 'ALI-3948',
      fine_amount: 100,
      brand: 'Car brand',
      category_id: '9abasdad2-bfbe-gk54-5342-854hd4586ad',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '1q2w3e4r5t6y',
      car_id: car.id as string,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const firstCar = await carsRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Carro executivo de luxo',
      daily_rate: 200.0,
      license_plate: 'ALI-3948',
      fine_amount: 100,
      brand: 'Car brand',
      category_id: '9abasdad2-bfbe-gk54-5342-854hd4586ad',
    });

    const secondCar = await carsRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Carro executivo de luxo',
      daily_rate: 200.0,
      license_plate: 'ALI-3948',
      fine_amount: 100,
      brand: 'Car brand',
      category_id: '9abasdad2-bfbe-gk54-5342-854hd4586ad',
    });

    await createRentalUseCase.execute({
      user_id: 'user A',
      car_id: firstCar.id as string,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'user A',
        car_id: secondCar.id as string,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Theres a rental in progress for user!'));
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Carro executivo de luxo',
      daily_rate: 200.0,
      license_plate: 'ALI-3948',
      fine_amount: 100,
      brand: 'Car brand',
      category_id: '9abasdad2-bfbe-gk54-5342-854hd4586ad',
    });

    await createRentalUseCase.execute({
      user_id: '1kfq2w3e4r5t6y',
      car_id: car.id as string,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'r1m23b4v5c6',
        car_id: car.id as string,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable!'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '7f7d6sk4hf8s',
        car_id: 'f9v0d99d8s2df',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
