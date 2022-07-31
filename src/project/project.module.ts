import {Module} from '@nestjs/common';
import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectEntity} from './entity/project.entity';
import {TaskEntity} from '../task/entities/task.entity';
import {ClientEntity} from '../client/entity/client.entity';
import {DaysEntity} from '../days/entity/days.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      TaskEntity,
      ClientEntity,
      DaysEntity,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
