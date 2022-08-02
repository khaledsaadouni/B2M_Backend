import { ProjectEntity } from './entity/project.entity';
import { Repository } from 'typeorm';
import { UpdateproDto } from './dto/UpdateproDto';
import { TaskEntity } from '../task/entities/task.entity';
import { ClientEntity } from '../client/entity/client.entity';
import { DaysEntity } from '../days/entity/days.entity';
export declare class ProjectService {
    private projectRepo;
    private TaskRepo;
    private ClientRepo;
    private DaysRepo;
    constructor(projectRepo: Repository<ProjectEntity>, TaskRepo: Repository<TaskEntity>, ClientRepo: Repository<ClientEntity>, DaysRepo: Repository<DaysEntity>);
    GetProjects(): Promise<ProjectEntity[]>;
    GetProjectById(id: number): Promise<ProjectEntity>;
    AddProject(project: any, id: any): Promise<ProjectEntity>;
    UpdateProject(id: number, project: UpdateproDto, idc: number): Promise<ProjectEntity>;
    RemoveProject(id: number): Promise<import("typeorm").DeleteResult>;
}
