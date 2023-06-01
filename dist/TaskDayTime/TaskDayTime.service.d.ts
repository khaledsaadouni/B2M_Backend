import { Repository } from 'typeorm';
import { TaskEntity } from '../task/entities/task.entity';
import { AddTaskDayTimeDto } from './dto/AddTaskDayTime';
import { UpdateTaskDayTimeDto } from './dto/UpdateTaskDayTime';
import { TasksDayTime } from './entity/TaskDayTime';
export declare class TaskDayTimeService {
    private TaskDayTimeRepo;
    private TaskRepo;
    constructor(TaskDayTimeRepo: Repository<TasksDayTime>, TaskRepo: Repository<TaskEntity>);
    GetTaskDayTime(): Promise<TasksDayTime[]>;
    GetTaskDayTimeByID(id: number): Promise<TasksDayTime>;
    AddTaskDayTime(taskDayTime: AddTaskDayTimeDto, id: number): Promise<TasksDayTime>;
    UpdateTaskDayTime(id: number, taskDayTime: UpdateTaskDayTimeDto): Promise<TasksDayTime>;
    RemovaTaskDayTime(id: number): Promise<TasksDayTime>;
    getTaskDayTimeByDate(datedebut: any, datefin: any): Promise<TasksDayTime[]>;
    getTaskDayTimeByUserId(userId: number): Promise<TasksDayTime[]>;
}
