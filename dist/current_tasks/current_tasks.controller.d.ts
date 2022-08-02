import { CurrentTasksService } from './current_tasks.service';
import { CurrentEntity } from './entity/current.entity';
import { TaskEntity } from '../task/entities/task.entity';
export declare class CurrentTasksController {
    private currentser;
    constructor(currentser: CurrentTasksService);
    GetCurrent(id: number): Promise<CurrentEntity>;
    create(t: any): Promise<CurrentEntity>;
    addtask(idc: number, id: number): Promise<TaskEntity>;
    deletetask(idc: number, id: number): Promise<TaskEntity>;
}
