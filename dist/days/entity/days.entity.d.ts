import { TaskEntity } from '../../task/entities/task.entity';
export declare class DaysEntity {
    id: number;
    day: number;
    month: number;
    year: number;
    coef: number;
    task: TaskEntity;
}
