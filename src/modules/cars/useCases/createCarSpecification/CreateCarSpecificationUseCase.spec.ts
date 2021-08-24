/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from '../../../../shared/infra/http/errors/AppError';
import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';
import SpecificationsRepositoryInMemory from '../../repositories/in-memory/SpecificationsRepositoryInMemory';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should not be able to add a new specification to a now-existents car', async () => {
    const car_id = '49938403';
    const specification_id = ['49938405'];

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specification_id })
    ).rejects.toEqual(new AppError('Car does not exists!'));
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name of Car',
      description: 'Description of car',
      daily_rate: 100,
      license_plate: 'Ab-39483',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Câmbio automático',
      description: 'Carro com câmbio automático',
    });

    const car_id = car.id!;
    const specification_id = [specification.id!];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id,
      specification_id,
    });

    // expect(specificationCars).toHaveProperty('specification');
    expect(specificationCars.specifications?.length).toBe(1);
  });
});
