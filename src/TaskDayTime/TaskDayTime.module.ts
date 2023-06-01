import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../task/entities/task.entity';
import { TasksDayTime } from './entity/TaskDayTime';
import { TaskDayTimeController } from './TaskDayTime.controller';
import { TaskDayTimeService } from './TaskDayTime.service';

@Module({
    imports: [TypeOrmModule.forFeature([TasksDayTime, TaskEntity])],
    providers: [TaskDayTimeService],
    controllers: [TaskDayTimeController],
})
export class TaskDayTimeModule { }
