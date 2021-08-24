import { getRepository, Repository } from 'typeorm';
import CarsImagesRepositoryInterface from '../../../repositories/CarsImagesRepositoryInterface';
import CarImage from '../entities/CarImage';

export default class CarsImagesRepository
  implements CarsImagesRepositoryInterface
{
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const image = await this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(image);

    return image;
  }
}
