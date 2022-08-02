import { TaskEntity } from '../../task/entities/task.entity';
import { UserEntity } from '../../user/entity/user.entity';
export declare class CurrentEntity {
    id: number;
    tasks: TaskEntity[];
    user: UserEntity;
}
