import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar', length: 30 })
  username!: string;

  @Column({ type: 'varchar', nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', nullable: true })
  profile_picture: string | null;

  @Column({ type: 'datetime' })
  created_at: Date;
}
