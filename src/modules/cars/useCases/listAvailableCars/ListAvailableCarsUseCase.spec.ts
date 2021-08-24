import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_A',
      description: 'Description car A',
      daily_rate: 100.0,
      license_plate: 'ABC-12345',
      fine_amount: 50,
      brand: 'Car-Brand_A',
      category_id: 'Category_Car_A',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_X',
      description: 'Description car X',
      daily_rate: 100.0,
      license_plate: 'XYZ-99999',
      fine_amount: 50,
      brand: 'Brand_Car_X',
      category_id: 'Category_Car_X',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car_X',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_Y',
      description: 'Description car Y',
      daily_rate: 100.0,
      license_plate: 'INT-04948',
      fine_amount: 50,
      brand: 'Brand_Car_Y',
      category_id: 'Category_Car_Y',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand_Car_Y',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_G',
      description: 'Description car G',
      daily_rate: 100.0,
      license_plate: 'PTB-50123',
      fine_amount: 50,
      brand: 'Brand_Car_G',
      category_id: 'Category_Car_G',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'Category_Car_G',
    });

    expect(cars).toEqual([car]);
  });
});
