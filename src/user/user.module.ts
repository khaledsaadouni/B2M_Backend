import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CurrentTasksModule } from '../current_tasks/current_tasks.module';
import { TaskEntity } from '../task/entities/task.entity';
import { CurrentEntity } from '../current_tasks/entity/current.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TaskEntity, CurrentEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'b2m',
    }),
    CurrentTasksModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
