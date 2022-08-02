import { ProjectService } from './project.service';
import { ProjectEntity } from './entity/project.entity';
import { UpdateproDto } from './dto/UpdateproDto';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    GetAll(): Promise<ProjectEntity[]>;
    AddProject(proj: any, cid: number): Promise<ProjectEntity>;
    UpdateProject(id: number, proj: UpdateproDto, cid: number): Promise<ProjectEntity>;
    DeleteProject(id: number): Promise<any>;
}
