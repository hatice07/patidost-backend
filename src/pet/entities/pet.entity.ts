import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';
import { Reminder } from '../../reminder/entities/reminder.entity';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  species: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  breed: string;

  @Column({ type: 'int' })
  age: number;

  @ManyToOne(() => User, (user) => user.pets, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Post, (post) => post.pet)
  posts: Post[];

  // Geri eklenen ilişki
  @OneToMany(() => Reminder, (reminder) => reminder.pet)
  reminders: Reminder[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}