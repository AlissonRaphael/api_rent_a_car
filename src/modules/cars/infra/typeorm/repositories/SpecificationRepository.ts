import { getRepository, Repository } from 'typeorm';

import Specification from '../entities/Specification';
import SpecificationRepositoryDTOInterface from '../../../dtos/SpecificationRepositoryDTOInterface';
import SpecificationRepositoryInterface from '../../../repositories/SpecificationsRepositoryInterface';

export default class SpecificationRepository
  implements SpecificationRepositoryInterface
{
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: SpecificationRepositoryDTOInterface): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specificationFound = await this.repository.findOne({
      name,
    });
    return specificationFound;
  }

  async findByIds(ids: string[]): Promise<Specification[] | undefined> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}
