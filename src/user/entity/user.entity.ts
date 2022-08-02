import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { TaskEntity } from '../../task/entities/task.entity';
import { CurrentEntity } from '../../current_tasks/entity/current.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  username: string;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  job: string;

  @Column()
  gender: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  role: string;

  @Column()
  phone: number;

  @OneToMany((type) => TaskEntity, (task) => task.user, { eager: true })
  tasks: TaskEntity[];
  @OneToOne((type) => CurrentEntity, (current) => current.user, {
    eager: true,
  })
  @JoinColumn()
  current: CurrentEntity;
}
