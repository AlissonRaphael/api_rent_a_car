import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import Category from './Category';
import Specification from './Specification';

@Entity('cars')
export default class Car {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public daily_rate: number;

  @Column()
  public available: boolean;

  @Column()
  public license_plate: string;

  @Column()
  public fine_amount: number;

  @Column()
  public brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  public category: Category | undefined;

  @Column()
  public category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications?: Specification[];

  @CreateDateColumn()
  public created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
    this.name = '';
    this.description = '';
    this.daily_rate = 0;
    this.available = true;
    this.license_plate = '';
    this.fine_amount = 0;
    this.brand = '';
    this.category_id = '';
    this.created_at = new Date();
  }
}
