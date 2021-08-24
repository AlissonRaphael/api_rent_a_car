import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('cars_image')
export default class CarImage {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public car_id: string;

  @Column()
  public image_name: string;

  @CreateDateColumn()
  public created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
    this.car_id = '';
    this.image_name = '';
    this.created_at = new Date();
  }
}
