import Rental from '../infra/typeorm/entities/Rental';
import CreateRentalDTOInterface from '../dtos/CreateRentalDTOInterface';

export default interface RentalsRepositoryInterface {
  create({
    user_id,
    car_id,
    expected_return_date,
  }: CreateRentalDTOInterface): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
  findById(id: string): Promise<Rental | undefined>;
  findByUser(user_id: string): Promise<Rental[]>;
}
