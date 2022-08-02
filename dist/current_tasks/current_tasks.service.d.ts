import { CurrentEntity } from './entity/current.entity';
import { Repository } from 'typeorm';
import { TaskEntity } from '../task/entities/task.entity';
export declare class CurrentTasksService {
    private TaskRepo;
    private currentRepo;
    constructor(TaskRepo: Repository<TaskEntity>, currentRepo: Repository<CurrentEntity>);
    getCurrent(id: number): Promise<CurrentEntity>;
    createCurrent(): Promise<CurrentEntity>;
    deletCurrent(c: any): Promise<any>;
    addtask(idc: number, id: number): Promise<TaskEntity>;
    deletetask(idc: number, id: number): Promise<TaskEntity>;
}
