import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('feeding_points')
export class FeedingPoint {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'float' })
  latitude!: number;

  @Column({ type: 'float' })
  longitude!: number;

  @Column({ default: 'FULL' }) // 'FULL', 'LOW', 'EMPTY'
  foodStatus!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  createdById!: number;

  @ManyToOne(() => User, (user) => user.feedingPoints, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createdById' })
  createdBy!: User;
}