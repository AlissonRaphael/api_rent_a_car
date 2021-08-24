import Category from '../infra/typeorm/entities/Category';
import CreateCategoryDTOInterface from '../dtos/CreateCategoryDTOInterface';

export default interface CategoriesRepositoryInterface {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create({ name, description }: CreateCategoryDTOInterface): Promise<void>;
}
