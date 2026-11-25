import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  // enum tipini varchar olarak değiştirdik
  @Column({ type: 'varchar', default: ApplicationStatus.PENDING })
  status: string;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  applicant: User;

  @ManyToOne(() => Post, (post) => post.applications, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}