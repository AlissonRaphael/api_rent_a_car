import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/infra/http/errors/AppError';
import SpecificationsRepositoryInterface from '../../repositories/SpecificationsRepositoryInterface';

interface RequestInterface {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  private specificationRepository: SpecificationsRepositoryInterface;

  constructor(
    @inject('SpecificationRepository')
    specificationRepository: SpecificationsRepositoryInterface
  ) {
    this.specificationRepository = specificationRepository;
  }

  async execute({ name, description }: RequestInterface): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    await this.specificationRepository.create({
      name,
      description,
    });
  }
}
