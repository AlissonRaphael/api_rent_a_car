import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

// import User from '../../../../accounts/infra/typeorm/entities/User';
import Car from '../../../../cars/infra/typeorm/entities/Car';

@Entity('rentals')
export default class Rental {
  @PrimaryColumn()
  public id?: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  public car: Car | undefined;

  @Column()
  public car_id: string;

  @Column()
  public user_id: string;

  @Column()
  public start_date: Date;

  @Column()
  public end_date?: Date;

  @Column()
  public expected_return_date: Date;

  @Column()
  public total?: number;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public update_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
    this.car_id = '';
    this.user_id = '';
    this.start_date = new Date();
    this.expected_return_date = new Date();
    this.created_at = new Date();
    this.update_at = new Date();
  }
}
