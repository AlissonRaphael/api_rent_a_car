import AppError from '../../../../shared/infra/http/errors/AppError';
import CategoriesRepositoryInMemory from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import CreateCategoryUseCase from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exist', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    };

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Category already exists!', 400)
    );
  });
});
