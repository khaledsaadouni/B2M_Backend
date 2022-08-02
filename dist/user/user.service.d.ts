import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CurrentEntity } from '../current_tasks/entity/current.entity';
import { CurrentTasksService } from '../current_tasks/current_tasks.service';
import { TaskEntity } from '../task/entities/task.entity';
export declare class UserService {
    private userRepository;
    private TaskRepo;
    private jwtService;
    private currentservice;
    private currentRepo;
    constructor(userRepository: Repository<UserEntity>, TaskRepo: Repository<TaskEntity>, jwtService: JwtService, currentservice: CurrentTasksService, currentRepo: Repository<CurrentEntity>);
    getcurrent(id: any): Promise<CurrentEntity>;
    register(userData: any): Promise<Partial<UserEntity>>;
    getloggeduser(id: any): Promise<UserEntity>;
    login(credentials: any): Promise<{
        access_token: string;
        id: number;
    }>;
    GetUsers(): Promise<UserEntity[]>;
    delete(id: any): Promise<any>;
    UpdateUser(id: number, user: any): Promise<UserEntity>;
    Getdevs(): Promise<UserEntity[]>;
}
