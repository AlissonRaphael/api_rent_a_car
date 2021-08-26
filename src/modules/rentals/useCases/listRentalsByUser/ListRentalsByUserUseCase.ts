import { inject, injectable } from 'tsyringe';
import Rental from '../../infra/typeorm/entities/Rental';

import RentalsRepositoryInterface from '../../repositories/RentalsRepositoryInterface';

interface RequestInterface {
  user_id: string;
}

@injectable()
export default class ListRentalsByUserUseCase {
  private rentalsRepository: RentalsRepositoryInterface;

  constructor(
    @inject('RentalsRepository')
    rentalsRepository: RentalsRepositoryInterface
  ) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute({ user_id }: RequestInterface): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUser(user_id);

    return rentals;
  }
}
