import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import User from './User';

@Entity('users_tokens')
export default class UserTokens {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public refresh_token: string;

  @Column()
  public user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User | undefined;

  @Column()
  public expires_date: Date;

  @CreateDateColumn()
  public created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
    this.refresh_token = '';
    this.user_id = '';
    this.expires_date = new Date();
    this.created_at = new Date();
  }
}
