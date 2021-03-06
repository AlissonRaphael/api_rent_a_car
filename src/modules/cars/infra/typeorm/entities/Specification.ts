import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('specifications')
export default class Specification {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @CreateDateColumn()
  public created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
    this.name = '';
    this.description = '';
    this.created_at = new Date();
  }
}
