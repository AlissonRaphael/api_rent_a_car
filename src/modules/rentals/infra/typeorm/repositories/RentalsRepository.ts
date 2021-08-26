import { getRepository, Repository } from 'typeorm';

import Rental from '../entities/Rental';
import CreateRentalDTOInterface from '../../../dtos/CreateRentalDTOInterface';
import RentalsRepositoryInterface from '../../../repositories/RentalsRepositoryInterface';

export default class RentalsRepository implements RentalsRepositoryInterface {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: CreateRentalDTOInterface): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return openByUser;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return openByCar;
  }

  async findById(id: string): Promise<Rental | undefined> {
    const openRental = await this.repository.findOne(id);
    return openRental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
    return rentals;
  }
}
