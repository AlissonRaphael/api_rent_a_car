import { inject, injectable } from 'tsyringe';
// import CarImage from '../../infra/typeorm/entities/CarImage';
import CarsImagesRepositoryInterface from '../../repositories/CarsImagesRepositoryInterface';

interface RequestInterface {
  car_id: string;
  images_name: string[];
}

@injectable()
export default class UploadCarImageUseCase {
  private carsImagesRepository: CarsImagesRepositoryInterface;

  constructor(
    @inject('CarsImagesRepository')
    carsImagesRepository: CarsImagesRepositoryInterface
  ) {
    this.carsImagesRepository = carsImagesRepository;
  }

  async execute({ car_id, images_name }: RequestInterface): Promise<void> {
    images_name.forEach(async (image_name) => {
      await this.carsImagesRepository.create(car_id, image_name);
    });
  }
}
