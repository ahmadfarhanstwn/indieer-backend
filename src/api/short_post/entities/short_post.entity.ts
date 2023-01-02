import { User } from '@/api/user/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShortPostLikeRelationship } from './short_post_like_relationship.entity';
import { ShortPostShareRelationship } from './short_post_share_relationship.entity';

@Entity()
export class ShortPost {
  @PrimaryGeneratedColumn()
  @OneToMany(() => ShortPost, (shortPost) => shortPost.reply_to_short_post_id)
  @OneToMany(
    () => ShortPostLikeRelationship,
    (shortPostLikeRelationship) => shortPostLikeRelationship.short_post_id,
  )
  @OneToMany(
    () => ShortPostShareRelationship,
    (shortPostShareRelationship) => shortPostShareRelationship.short_post_id,
  )
  id!: number;

  @Column({ type: 'varchar', length: 300 })
  content!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @Index()
  user_id!: string;

  @ManyToOne(() => ShortPost, (shortPost) => shortPost.id, { nullable: true })
  @JoinColumn({ name: 'reply_to_short_post_id', referencedColumnName: 'id' })
  @Index()
  reply_to_short_post_id?: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updated_at?: Date;
}
