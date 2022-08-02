import { TimestampEntity } from '../../generics/timestamp.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { ClientEntity } from '../../client/entity/client.entity';
export declare class ProjectEntity extends TimestampEntity {
    id: number;
    name: string;
    state: string;
    DL: Date;
    tasks: TaskEntity[];
    client: ClientEntity;
}
