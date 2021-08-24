import CarImage from '../infra/typeorm/entities/CarImage';

export default interface CarsImagesRepositoryInterface {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
