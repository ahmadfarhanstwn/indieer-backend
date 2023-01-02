import { User } from '@/api/user/user.entity';
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShortPost } from './short_post.entity';

@Entity()
export class ShortPostLikeRelationship {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ShortPost, (shortPost) => shortPost.id, { nullable: false })
  @JoinColumn({ name: 'short_post_id', referencedColumnName: 'id' })
  @Index()
  short_post_id!: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user_id!: string;
}
