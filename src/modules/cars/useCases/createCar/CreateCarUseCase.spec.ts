import AppError from '../../../../shared/infra/http/errors/AppError';
import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name of Car',
      description: 'Description of car',
      daily_rate: 100,
      license_plate: 'Ab-39483',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car1',
      description: 'Description of car1',
      daily_rate: 100,
      license_plate: 'Ab-39483',
      fine_amount: 40,
      brand: 'Brand',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Car2',
        description: 'Description of car2',
        daily_rate: 150,
        license_plate: 'Ab-39483',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      })
    ).rejects.toEqual(new AppError('Car already exists!'));
  });

  it('should not be able to create a car with available false', async () => {
    const car = await createCarUseCase.execute({
      name: 'MoreCar',
      description: 'Description of more a car',
      daily_rate: 100,
      license_plate: 'Ab-39483',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
