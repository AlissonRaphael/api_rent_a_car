import { getRepository, Repository } from 'typeorm';

import Category from '../entities/Category';
import CreateCategoryDTOInterface from '../../../dtos/CreateCategoryDTOInterface';
import CategoriesRepositoryInterface from '../../../repositories/CategoriesRepositoryInterface';

export default class CategoriesRepository
  implements CategoriesRepositoryInterface
{
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({
    name,
    description,
  }: CreateCategoryDTOInterface): Promise<void> {
    const category = this.repository.create({ name, description });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const categoryFound = await this.repository.findOne({ name });
    return categoryFound;
  }
}
