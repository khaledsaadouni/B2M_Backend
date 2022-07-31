import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {DaysEntity} from '../../days/entity/days.entity';
import {ProjectEntity} from '../../project/entity/project.entity';
import {CurrentEntity} from '../../current_tasks/entity/current.entity';
import {UserEntity} from '../../user/entity/user.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  task: string;
  @Column()
  state: string;
  @OneToMany((type) => DaysEntity, (days) => days.task, {
    cascade: true,
    eager: true,
  })
  days: DaysEntity[];
  @ManyToOne((type) => ProjectEntity, (project) => project.tasks, {
    cascade: true,
  })
  project: ProjectEntity;
  @ManyToOne((type) => CurrentEntity, (current) => current.tasks)
  current: CurrentEntity;
  @ManyToOne((type) => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
