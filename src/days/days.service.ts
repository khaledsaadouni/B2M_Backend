import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {DaysEntity} from './entity/days.entity';
import {AddDayDto} from './dto/AddDayDto';
import {UpdateDayDto} from './dto/UpdateDayDt';
import {TaskEntity} from '../task/entities/task.entity';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(DaysEntity)
    private DaysRepo: Repository<DaysEntity>,
    @InjectRepository(TaskEntity)
    private TaskRepo: Repository<TaskEntity>,
  ) {}
  async GetDays(): Promise<DaysEntity[]> {
    return await this.DaysRepo.find();
  }
  async GetDayByID(id: number): Promise<DaysEntity> {
    return await this.DaysRepo.findOneBy({ id });
  }
  async AddDay(Day: AddDayDto, id: number): Promise<DaysEntity> {
    const p = await await this.TaskRepo.findOneBy({ id });
    const t = new DaysEntity();
    t.day = Day.day;
    t.month = Day.month;
    t.year = Day.year;
    t.coef = Day.coef;
    t.task = p;
    return await this.DaysRepo.save(t);
  }
  async UpdateDay(id: number, day: UpdateDayDto): Promise<DaysEntity> {
    const newday = await this.DaysRepo.preload({ id, ...day });
    if (!newday) {
      throw new NotFoundException('The specefied task does not exist');
    }
    return await this.DaysRepo.save(newday);
  }
  async RemovaDay(id: number) {
    const pro = await this.DaysRepo.findOneBy({ id });
    return await this.DaysRepo.remove(pro);
  }
  async daytask(t, d, m, y): Promise<DaysEntity> {
    const qb = this.DaysRepo.createQueryBuilder('day');
    return await qb
      .select('')
      .where(
        `day.taskId = ${t} and day.day=${d} and day.month=${m} and day.year= ${y}`,
      )
      .getOne();
  }
}
