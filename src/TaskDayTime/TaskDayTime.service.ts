import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../task/entities/task.entity';
import { AddTaskDayTimeDto } from './dto/AddTaskDayTime';
import { UpdateTaskDayTimeDto } from './dto/UpdateTaskDayTime';
import { TasksDayTime } from './entity/TaskDayTime';
import * as moment from 'moment-timezone';
@Injectable()
export class TaskDayTimeService {
    constructor(
        @InjectRepository(TasksDayTime)
        private TaskDayTimeRepo: Repository<TasksDayTime>,
        @InjectRepository(TaskEntity)
        private TaskRepo: Repository<TaskEntity>,
    ) { }

    async GetTaskDayTime(): Promise<TasksDayTime[]> {
        const taskDayTime = await this.TaskDayTimeRepo
            .createQueryBuilder('taskDayTime')
            .leftJoinAndSelect('taskDayTime.task', 'task')
            .getMany()
        return taskDayTime;
    }
    async GetTaskDayTimeByID(id: number): Promise<TasksDayTime> {
        const taskDayTime = await this.TaskDayTimeRepo
            .createQueryBuilder('taskDayTime')
            .leftJoinAndSelect('taskDayTime.task', 'task')
            .where('taskDayTime.id = :id', { id })
            .getOne();

        return taskDayTime;
    }
    async AddTaskDayTime(taskDayTime: AddTaskDayTimeDto, id: number): Promise<TasksDayTime> {

        const p = await this.TaskRepo.findOneBy({ id });
        const t = new TasksDayTime();
        t.dateDebut = taskDayTime.dateDebut;
        t.dateFin = taskDayTime.dateFin;
        t.duration = taskDayTime.duration;
        t.task = p;
        return await this.TaskDayTimeRepo.save(t);
    }
    async UpdateTaskDayTime(id: number, taskDayTime: UpdateTaskDayTimeDto): Promise<TasksDayTime> {
        const newtaskdaytime = await this.TaskDayTimeRepo.preload({ id, ...taskDayTime });
        if (!newtaskdaytime) {
            throw new NotFoundException('The specefied task does not exist');
        }
        return await this.TaskDayTimeRepo.save(newtaskdaytime);
    }
    async RemovaTaskDayTime(id: number) {
        const pro = await this.TaskDayTimeRepo.findOneBy({ id });
        return await this.TaskDayTimeRepo.remove(pro);
    }

    async getTaskDayTimeByDate(datedebut, datefin): Promise<TasksDayTime[]> {
        const dbTimeZone = await this.TaskDayTimeRepo.query('SELECT @@system_time_zone AS dbTimeZone');
        const formattedDatedebut = moment.utc(datedebut).tz(dbTimeZone[0].dbTimeZone).format('YYYY-MM-DD HH:mm:ss');
        const formattedDatefin = moment.utc(datefin).tz(dbTimeZone[0].dbTimeZone).format('YYYY-MM-DD HH:mm:ss');
        const taskDayTime = await this.TaskDayTimeRepo
            .createQueryBuilder('taskDayTime')
            .leftJoinAndSelect('taskDayTime.task', 'task')
            .where(
                'taskDayTime.dateDebut BETWEEN :datedebut AND :datefin AND taskDayTime.dateFin BETWEEN :datedebut AND :datefin',
                { datedebut: formattedDatedebut, datefin: formattedDatefin }
            )
            .getMany();
        return taskDayTime;
    }
    async getTaskDayTimeByUserId(userId: number): Promise<TasksDayTime[]> {
        return this.TaskDayTimeRepo
            .createQueryBuilder('tasksdaytime')
            .leftJoinAndSelect('tasksdaytime.task', 'task')
            .leftJoin('task.user', 'user')
            .where('user.id = :userId', { userId })
            .getMany();
    }
}
