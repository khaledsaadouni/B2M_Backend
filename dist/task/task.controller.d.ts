import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';
import { AddTaskDto } from './dto/AddTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
export declare class TaskController {
    private TaskService;
    constructor(TaskService: TaskService);
    GetTasks(): Promise<TaskEntity[]>;
    GetTaskByID(id: number): Promise<TaskEntity>;
    GetTaskByIdUser(id: number): Promise<TaskEntity[]>;
    GetProjectTask(id: number): Promise<TaskEntity[]>;
    AddTask(task: AddTaskDto, p: number, dev: number): Promise<TaskEntity>;
    UpdateProject(id: number, task: UpdateTaskDto, dev: number): Promise<TaskEntity>;
    DeleteProject(id: number): Promise<any>;
}
