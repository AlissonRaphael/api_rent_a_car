import Category from '../../infra/typeorm/entities/Category';
import CreateCategoryDTOInterface from '../../dtos/CreateCategoryDTOInterface';
import CategoriesRepositoryInterface from '../CategoriesRepositoryInterface';

export default class CategoriesRepositoryInMemory
  implements CategoriesRepositoryInterface
{
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find((item) => item.name === name);
    return category;
  }

  async list(): Promise<Category[]> {
    const list = this.categories;
    return list;
  }

  async create({
    name,
    description,
  }: CreateCategoryDTOInterface): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }
}
