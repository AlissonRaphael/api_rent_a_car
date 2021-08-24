import CreateCategoryDTOInterface from '../../dtos/CreateCategoryDTOInterface';
import Specification from '../../infra/typeorm/entities/Specification';
import SpecificationsRepositoryInterface from '../SpecificationsRepositoryInterface';

export default class SpecificationsRepositoryInMemory
  implements SpecificationsRepositoryInterface
{
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description,
  }: CreateCategoryDTOInterface): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[] | undefined> {
    const allSpecifications = this.specifications.filter((item) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ids.includes(item.id!)
    );

    return allSpecifications;
  }
}
