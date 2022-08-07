import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysModule } from './days/days.module';
import { TestController } from './test/test.controller';
import { ClientModule } from './client/client.module';
import { CurrentTasksModule } from './current_tasks/current_tasks.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientModule,
    TaskModule,
    DaysModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'remotemysql.com',
      port: 3306,
      username: 'ozzwefiie1',
      password: '6NxJo5Dta1',
      database: 'ozzwefiie1',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CurrentTasksModule,
    UserModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
