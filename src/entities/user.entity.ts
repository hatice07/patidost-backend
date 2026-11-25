import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';
import { AdoptionRequest } from './adoption-request.entity';
import { FeedingPoint } from './feeding-point.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'USER' }) // 'USER' veya 'ADMIN'
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets!: Pet[];

  @OneToMany(() => AdoptionRequest, (request) => request.user)
  adoptionRequests!: AdoptionRequest[];

  @OneToMany(() => FeedingPoint, (point) => point.createdBy)
  feedingPoints!: FeedingPoint[];
}