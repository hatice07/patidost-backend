import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pet } from './pet.entity';

@Entity('health_records')
export class HealthRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  vaccineName!: string;

  @Column()
  treatmentNote!: string;

  @CreateDateColumn()
  recordDate!: Date;

  @Column()
  petId!: number;

  @ManyToOne(() => Pet, (pet) => pet.healthRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'petId' })
  pet!: Pet;
}