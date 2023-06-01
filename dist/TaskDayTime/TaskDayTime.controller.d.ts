import { UpdateTaskDayTimeDto } from './dto/UpdateTaskDayTime';
import { TasksDayTime } from './entity/TaskDayTime';
import { TaskDayTimeService } from './TaskDayTime.service';
export declare class TaskDayTimeController {
    private DaysSerivce;
    constructor(DaysSerivce: TaskDayTimeService);
    GetTasksDayTime(): Promise<TasksDayTime[]>;
    GetTasksDayTimeById(id: number): Promise<TasksDayTime>;
    AddTaskDayTime(day: any, t: number): Promise<TasksDayTime>;
    UpdateTaskDayTime(id: number, task: UpdateTaskDayTimeDto): Promise<TasksDayTime>;
    DeletTaskDayTime(id: number): Promise<any>;
    Getdaytask(debut: Date, fin: Date): Promise<TasksDayTime[]>;
    getTaskDayTimeByUser(userId: number): Promise<TasksDayTime[]>;
}
