import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShortPost } from '../short_post/entities/short_post.entity';
import { ShortPostLikeRelationship } from '../short_post/entities/short_post_like_relationship.entity';
import { ShortPostShareRelationship } from '../short_post/entities/short_post_share_relationship.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => ShortPost, (shortPost) => shortPost.user_id)
  @OneToMany(
    () => ShortPostLikeRelationship,
    (shortPostLikeRelationship) => shortPostLikeRelationship.user_id,
  )
  @OneToMany(
    () => ShortPostShareRelationship,
    (shortPostShareRelationship) => shortPostShareRelationship.user_id,
  )
  id!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  username!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', nullable: true })
  profile_picture: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
