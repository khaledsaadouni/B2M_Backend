import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '../../task/entities/task.entity';

@Entity('TasksDayTime')
export class TasksDayTime {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    dateDebut: Date;
    @Column()
    dateFin: Date;
    @Column()
    duration: string;
    @ManyToOne((type) => TaskEntity, (task) => task.tasksDayTimes)
    task: TaskEntity;

}
