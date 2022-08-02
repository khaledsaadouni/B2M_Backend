import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { CurrentEntity } from '../current_tasks/entity/current.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register(userData: any): Promise<Partial<UserEntity>>;
    login(credentials: any): Promise<{
        access_token: string;
        id: number;
    }>;
    getloggeduser(id: any): Promise<UserEntity>;
    getcurrentuser(id: any): Promise<CurrentEntity>;
    getDevs(): Promise<UserEntity[]>;
    getUsers(): Promise<UserEntity[]>;
    Delete(id: number): Promise<any>;
    UpdateUser(id: number, user: any): Promise<UserEntity>;
}
