import { getRepository, Repository } from 'typeorm';

import Car from '../entities/Car';
import CarsRepositoryInterface from '../../../repositories/CarsRepositoryInterface';
import CreateCarDTOInterface from '../../../dtos/CreateCarDTOInterface';

export default class CarsRepository implements CarsRepositoryInterface {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: CreateCarDTOInterface): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[] | undefined> {
    const carsQuery = await this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('cars.name = :name', { name });
    }

    if (brand) {
      carsQuery.andWhere('cars.brand = :brand', { brand });
    }

    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}
