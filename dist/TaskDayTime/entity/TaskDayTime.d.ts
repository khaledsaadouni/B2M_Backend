import { TaskEntity } from '../../task/entities/task.entity';
export declare class TasksDayTime {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    duration: string;
    task: TaskEntity;
}
