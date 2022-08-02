import { DaysService } from './days.service';
import { DaysEntity } from './entity/days.entity';
import { UpdateDayDto } from './dto/UpdateDayDt';
export declare class DaysController {
    private DaysSerivce;
    constructor(DaysSerivce: DaysService);
    GetTasks(): Promise<DaysEntity[]>;
    AddDay(day: any, t: number): Promise<DaysEntity>;
    UpdateDay(id: number, task: UpdateDayDto): Promise<DaysEntity>;
    DeletDay(id: number): Promise<any>;
    Getdaytask(t: number, d: number, m: number, y: number): Promise<DaysEntity>;
}
