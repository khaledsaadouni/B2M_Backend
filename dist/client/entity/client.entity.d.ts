import { ProjectEntity } from '../../project/entity/project.entity';
export declare class ClientEntity {
    id: number;
    name: string;
    email: string;
    phone: number;
    projects: ProjectEntity[];
}
