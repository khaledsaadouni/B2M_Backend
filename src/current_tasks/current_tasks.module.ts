import {Module} from '@nestjs/common';
import {CurrentTasksController} from './current_tasks.controller';
import {CurrentTasksService} from './current_tasks.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CurrentEntity} from './entity/current.entity';
import {TaskEntity} from '../task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentEntity, TaskEntity])],
  controllers: [CurrentTasksController],
  providers: [CurrentTasksService],
  exports: [CurrentTasksService]
})
export class CurrentTasksModule {}
