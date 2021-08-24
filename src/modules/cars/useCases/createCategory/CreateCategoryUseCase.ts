import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/infra/http/errors/AppError';
import CategoriesRepositoryInterface from '../../repositories/CategoriesRepositoryInterface';

interface RequestInterface {
  name: string;
  description: string;
}

@injectable()
export default class CreateCategoryUseCase {
  private categoriesRepository: CategoriesRepositoryInterface;

  constructor(
    @inject('CategoriesRepository')
    categoriesRepository: CategoriesRepositoryInterface
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({ name, description }: RequestInterface): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!', 400);
    }

    this.categoriesRepository.create({ name, description });
  }
}
