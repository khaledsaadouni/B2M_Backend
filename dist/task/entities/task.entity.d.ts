import { DaysEntity } from '../../days/entity/days.entity';
import { ProjectEntity } from '../../project/entity/project.entity';
import { CurrentEntity } from '../../current_tasks/entity/current.entity';
import { UserEntity } from '../../user/entity/user.entity';
export declare class TaskEntity {
    id: number;
    task: string;
    state: string;
    days: DaysEntity[];
    project: ProjectEntity;
    current: CurrentEntity;
    user: UserEntity;
}
