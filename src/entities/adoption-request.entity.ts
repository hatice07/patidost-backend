import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Pet } from './pet.entity';

@Entity('adoption_requests')
export class AdoptionRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column({ default: 'PENDING' }) // 'PENDING', 'APPROVED', 'REJECTED'
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.adoptionRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  petId!: number;

  @ManyToOne(() => Pet, (pet) => pet.adoptionRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'petId' })
  pet!: Pet;
}