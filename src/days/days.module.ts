import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysEntity } from './entity/days.entity';
import { TaskEntity } from '../task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DaysEntity, TaskEntity])],
  providers: [DaysService],
  controllers: [DaysController],
})
export class DaysModule {}
