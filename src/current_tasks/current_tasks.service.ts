import { Injectable } from '@nestjs/common';
import { CurrentEntity } from './entity/current.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../task/entities/task.entity';

@Injectable()
export class CurrentTasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private TaskRepo: Repository<TaskEntity>,
    @InjectRepository(CurrentEntity)
    private currentRepo: Repository<CurrentEntity>,
  ) {}
  async getCurrent(id: number): Promise<CurrentEntity> {
    return await this.currentRepo.findOneBy({ id });
  }
  async createCurrent(): Promise<CurrentEntity> {
    return await this.currentRepo.save(new CurrentEntity());
  }
  async deletCurrent(c): Promise<any> {
    return await this.currentRepo.remove(c);
  }

  async addtask(idc: number, id: number): Promise<TaskEntity> {
    const t = await this.TaskRepo.findOneBy({ id });
    const qb = this.currentRepo.createQueryBuilder('current');
    const c = await qb.select('').where(`current.id = ${idc}`).getOne();
    t.current = c;
    return await this.TaskRepo.save(t);
  }
  async deletetask(idc: number, id: number): Promise<TaskEntity> {
    const t = await this.TaskRepo.findOneBy({ id });
    const qb = this.currentRepo.createQueryBuilder('current');
    const c = await qb.select('').where(`current.id = ${idc}`).getOne();
    t.current = null;
    return await this.TaskRepo.save(t);
  }
}
