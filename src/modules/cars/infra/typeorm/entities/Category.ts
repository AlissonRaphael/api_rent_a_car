import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('categories')
export default class Category {
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
