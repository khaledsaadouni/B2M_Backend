import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {TaskEntity} from '../../task/entities/task.entity';

@Entity('days')
export class DaysEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  day: number;
  @Column()
  month: number;
  @Column()
  year: number;
  @Column({ type: 'float' })
  coef: number;
  @ManyToOne((type) => TaskEntity, (task) => task.days)
  task: TaskEntity;
}
