import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';
import { AddTaskDto } from './dto/AddTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

@Controller('task')
export class TaskController {
  constructor(private TaskService: TaskService) {}
  @Get('all')
  async GetTasks(): Promise<TaskEntity[]> {
    return this.TaskService.GetTasks();
  }
  @Get('/project/:id')
  async GetProjectTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskEntity[]> {
    return await this.TaskService.GetTasksProject(id);
  }
  @Post('add/:project/:dev')
  async AddTask(
    @Body() task: AddTaskDto,
    @Param('project') p: number,
    @Param('dev') dev: number,
  ): Promise<TaskEntity> {
    return this.TaskService.AddTask(task, p, dev);
  }
  @Patch('update/:id/:dev')
  async UpdateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
    @Param('dev') dev: number,
  ): Promise<TaskEntity> {
    return await this.TaskService.UpdateTask(id, task, dev);
  }
  @Delete('delete/:id')
  async DeleteProject(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.TaskService.RemoveTask(id);
  }
}
