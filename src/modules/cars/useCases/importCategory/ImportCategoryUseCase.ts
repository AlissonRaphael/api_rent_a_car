/* eslint-disable class-methods-use-this */
import fs from 'fs';
import csvParse from 'csv-parse';
import { inject, injectable } from 'tsyringe';

import CategoriesRepositoryInterface from '../../repositories/CategoriesRepositoryInterface';

interface ImportInterface {
  name: string;
  description: string;
}

@injectable()
export default class ImportCategoryUseCase {
  private categoriesRepository: CategoriesRepositoryInterface;

  constructor(
    @inject('CategoriesRepository')
    categoriesRepository: CategoriesRepositoryInterface
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  loadCategories(file: Express.Multer.File): Promise<ImportInterface[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ImportInterface[] = [];
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}
