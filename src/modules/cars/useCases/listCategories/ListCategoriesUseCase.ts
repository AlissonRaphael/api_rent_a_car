import { inject, injectable } from 'tsyringe';

import Category from '../../infra/typeorm/entities/Category';
import CategoriesRepositoryInterface from '../../repositories/CategoriesRepositoryInterface';

@injectable()
export default class ListCategoriesUseCase {
  private categoriesRepository: CategoriesRepositoryInterface;

  constructor(
    @inject('CategoriesRepository')
    categoriesRepository: CategoriesRepositoryInterface
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<Category[]> {
    const allCategorires = await this.categoriesRepository.list();
    return allCategorires;
  }
}
