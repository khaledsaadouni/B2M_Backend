import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CurrentTasksService } from './current_tasks.service';
import { CurrentEntity } from './entity/current.entity';
import { TaskEntity } from '../task/entities/task.entity';

@Controller('current')
export class CurrentTasksController {
  constructor(private currentser: CurrentTasksService) { }
  @Get('all/:id')
  async GetCurrent(@Param('id') id: number): Promise<CurrentEntity> {
    return await this.currentser.getCurrent(id);
  }
  @Post()
  async create(@Body() t): Promise<CurrentEntity> {
    return await this.currentser.createCurrent();
  }
  @Get('add/:idc/:id')
  async addtask(
    @Param('idc') idc: number,
    @Param('id') id: number,
  ): Promise<TaskEntity> {
    return await this.currentser.addtask(idc, id);
  }
  @Delete('delete/:idc/:id')
  async deletetask(
    @Param('idc') idc: number,
    @Param('id') id: number,
  ): Promise<TaskEntity> {
    return await this.currentser.deletetask(idc, id);
  }
}
