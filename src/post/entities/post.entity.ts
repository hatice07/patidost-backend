import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Pet } from '../../pet/entities/pet.entity';
import { Application } from '../../application/entities/application.entity';

export enum PostType {
  LOST = 'LOST',
  ADOPTION = 'ADOPTION',
}

export enum PostStatus {
  ACTIVE = 'ACTIVE',
  RESOLVED = 'RESOLVED',
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', default: PostType.LOST })
  type: string;

  @Column({ type: 'varchar', default: PostStatus.ACTIVE })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Pet, (pet) => pet.posts, { onDelete: 'CASCADE' })
  pet: Pet;

  // Geri eklenen ilişki
  @OneToMany(() => Application, (app) => app.post)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}