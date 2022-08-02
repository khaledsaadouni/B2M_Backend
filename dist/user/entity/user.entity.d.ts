import { TaskEntity } from '../../task/entities/task.entity';
import { CurrentEntity } from '../../current_tasks/entity/current.entity';
export declare class UserEntity {
    id: number;
    username: string;
    name: string;
    firstname: string;
    job: string;
    gender: string;
    email: string;
    password: string;
    salt: string;
    birthday: Date;
    role: string;
    phone: number;
    tasks: TaskEntity[];
    current: CurrentEntity;
}
