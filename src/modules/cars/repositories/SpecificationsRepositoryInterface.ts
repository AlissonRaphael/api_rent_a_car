import Specification from '../infra/typeorm/entities/Specification';
import SpecificationRepositoryDTOInterface from '../dtos/CreateCategoryDTOInterface';

export default interface SpecificationRepositoryInterface {
  create({
    name,
    description,
  }: SpecificationRepositoryDTOInterface): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[] | undefined>;
}
