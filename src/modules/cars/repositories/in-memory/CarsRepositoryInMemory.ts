import Car from '../../infra/typeorm/entities/Car';
import CreateCarDTOInterface from '../../dtos/CreateCarDTOInterface';
import CarsRepositoryInterface from '../CarsRepositoryInterface';

export default class CarsRepositoryInMemory implements CarsRepositoryInterface {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: CreateCarDTOInterface): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((item) => item.license_plate === license_plate);
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[] | undefined> {
    let carsAvailable = this.cars.filter((car) => car.available === true);

    if (name || brand || category_id) {
      carsAvailable = carsAvailable.filter((car) => {
        const byName = car.name === name;
        const byBrand = car.brand === brand;
        const byCategory = car.category_id === category_id;
        return byName || byBrand || byCategory;
      });
    }

    return carsAvailable;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((item) => item.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex((car) => car.id === id);
    this.cars[index].available = available;
  }
}
