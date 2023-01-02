import { User } from '@/api/user/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShortPost } from './short_post.entity';

@Entity()
export class ShortPostShareRelationship {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ShortPost, (shortPost) => shortPost.id, { nullable: false })
  @JoinColumn({ name: 'short_post_id', referencedColumnName: 'id' })
  short_post_id!: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @Index()
  user_id!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
