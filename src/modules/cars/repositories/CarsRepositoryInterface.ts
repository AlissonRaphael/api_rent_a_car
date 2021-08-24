import Car from '../infra/typeorm/entities/Car';
import CreateCarDTOInterface from '../dtos/CreateCarDTOInterface';

export default interface CarsRepositoryInterface {
  create(data: CreateCarDTOInterface): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[] | undefined>;
  findById(id: string): Promise<Car | undefined>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
