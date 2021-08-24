import CarImage from '../../infra/typeorm/entities/CarImage';
import CarsImagesRepositoryInterface from '../CarsImagesRepositoryInterface';

export default class CarsImagesRepositoryInMemory
  implements CarsImagesRepositoryInterface
{
  private repository: CarImage[];

  constructor() {
    this.repository = [];
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, {
      car_id,
      image_name,
    });

    this.repository.push(carImage);

    return carImage;
  }
}
