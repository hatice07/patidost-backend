import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { AdoptionRequest } from './adoption-request.entity';
import { HealthRecord } from './health-record.entity';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  species!: string; // Kedi, Köpek vb.

  @Column({ default: 1 })
  age!: number;

  @Column()
  description!: string;

  @Column({ default: 'AVAILABLE' }) // 'AVAILABLE' veya 'ADOPTED'
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  ownerId!: number;

  @ManyToOne(() => User, (user) => user.pets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner!: User;

  @OneToMany(() => AdoptionRequest, (request) => request.pet)
  adoptionRequests!: AdoptionRequest[];

  @OneToMany(() => HealthRecord, (record) => record.pet)
  healthRecords!: HealthRecord[];
}