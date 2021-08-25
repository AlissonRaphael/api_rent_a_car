import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
export default class User {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public driver_license: string;

  @Column()
  public is_admin: boolean;

  @Column()
  public avatar: string;

  @CreateDateColumn()
  public created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
    this.name = '';
    this.email = '';
    this.password = '';
    this.driver_license = '';
    this.is_admin = false;
    this.avatar = '';
    this.created_at = new Date();
  }
}
