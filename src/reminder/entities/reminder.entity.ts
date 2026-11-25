import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Pet } from '../../pet/entities/pet.entity';

export enum ReminderType {
  VACCINE = 'VACCINE',
  VET = 'VET',
  MEDICINE = 'MEDICINE',
}

@Entity('reminders')
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar' })
  type: string;

  // Changed from 'timestamp' to 'datetime' for SQLite compatibility
  @Column({ type: 'datetime' })
  eventDate: Date;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.reminders, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Pet, (pet) => pet.reminders, { onDelete: 'CASCADE' })
  pet: Pet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}