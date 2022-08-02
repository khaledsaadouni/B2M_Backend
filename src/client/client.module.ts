import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entity/client.entity';
import { ProjectModule } from '../project/project.module';
import { ProjectEntity } from '../project/entity/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, ProjectEntity]),
    ProjectModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
