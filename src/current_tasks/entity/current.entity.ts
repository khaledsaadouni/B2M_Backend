import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '../../task/entities/task.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('current')
export class CurrentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany((type) => TaskEntity, (task) => task.current, {
    cascade: true,
    eager: true,
  })
  tasks: TaskEntity[];
  @OneToOne((type) => UserEntity, (user) => user.current, { cascade: true })
  user: UserEntity;
}
