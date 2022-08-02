import { Repository } from 'typeorm';
import { DaysEntity } from './entity/days.entity';
import { AddDayDto } from './dto/AddDayDto';
import { UpdateDayDto } from './dto/UpdateDayDt';
import { TaskEntity } from '../task/entities/task.entity';
export declare class DaysService {
    private DaysRepo;
    private TaskRepo;
    constructor(DaysRepo: Repository<DaysEntity>, TaskRepo: Repository<TaskEntity>);
    GetDays(): Promise<DaysEntity[]>;
    GetDayByID(id: number): Promise<DaysEntity>;
    AddDay(Day: AddDayDto, id: number): Promise<DaysEntity>;
    UpdateDay(id: number, day: UpdateDayDto): Promise<DaysEntity>;
    RemovaDay(id: number): Promise<DaysEntity>;
    daytask(t: any, d: any, m: any, y: any): Promise<DaysEntity>;
}
