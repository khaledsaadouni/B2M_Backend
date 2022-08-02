import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { AddTaskDto } from './dto/AddTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { ProjectService } from '../project/project.service';
import { DaysEntity } from '../days/entity/days.entity';
import { UserEntity } from '../user/entity/user.entity';
export declare class TaskService {
    private TaskRepo;
    private projectservice;
    private DaysRepo;
    private userRepository;
    constructor(TaskRepo: Repository<TaskEntity>, projectservice: ProjectService, DaysRepo: Repository<DaysEntity>, userRepository: Repository<UserEntity>);
    GetTasks(): Promise<TaskEntity[]>;
    GetTaskByID(id: number): Promise<TaskEntity>;
    AddTask(Task: AddTaskDto, projID: number, id: number): Promise<TaskEntity>;
    UpdateTask(id: number, task: UpdateTaskDto, iddev: number): Promise<TaskEntity>;
    RemoveTask(id: number): Promise<TaskEntity>;
    GetTasksProject(id: any): Promise<TaskEntity[]>;
}
