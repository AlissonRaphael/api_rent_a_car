import { container } from 'tsyringe';

import './providers';

import CarsImagesRepository from '../../modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import CarsImagesRepositoryInterface from '../../modules/cars/repositories/CarsImagesRepositoryInterface';
import CarsRepository from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import CarsRepositoryInterface from '../../modules/cars/repositories/CarsRepositoryInterface';
import CategoriesRepository from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import CategoriesRepositoryInterface from '../../modules/cars/repositories/CategoriesRepositoryInterface';
import RentalsRepository from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';
import RentalsRepositoryInterface from '../../modules/rentals/repositories/RentalsRepositoryInterface';
import SpecificationRepository from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';
import SpecificationRepositoryInterface from '../../modules/cars/repositories/SpecificationsRepositoryInterface';
import UsersRepository from '../../modules/accounts/infra/typeorm/repository/UsersRepository';
import UsersRepositoryInterface from '../../modules/accounts/repositories/UsersRepositoryInterface';
import UsersTokensRepository from '../../modules/accounts/infra/typeorm/repository/UsersTokensRepository';
import UsersTokensRepositoryInterface from '../../modules/accounts/repositories/UsersTokensRepositoryInterface';

container.registerSingleton<CarsImagesRepositoryInterface>(
  'CarsImagesRepository',
  CarsImagesRepository
);

container.registerSingleton<CarsRepositoryInterface>(
  'CarsRepository',
  CarsRepository
);

container.registerSingleton<RentalsRepositoryInterface>(
  'RentalsRepository',
  RentalsRepository
);

container.registerSingleton<SpecificationRepositoryInterface>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<CategoriesRepositoryInterface>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<UsersTokensRepositoryInterface>(
  'UsersTokensRepository',
  UsersTokensRepository
);
