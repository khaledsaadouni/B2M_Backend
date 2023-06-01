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
import { UpdateTaskDayTimeDto } from './dto/UpdateTaskDayTime';
import { TasksDayTime } from './entity/TaskDayTime';
import { TaskDayTimeService } from './TaskDayTime.service';


@Controller('taskdaytime')
export class TaskDayTimeController {
    constructor(private DaysSerivce: TaskDayTimeService) { }
    @Get('all')
    async GetTasksDayTime(): Promise<TasksDayTime[]> {
        return this.DaysSerivce.GetTaskDayTime();
    }
    @Get('getById/:id')
    async GetTasksDayTimeById(@Param('id', ParseIntPipe) id: number,
    ): Promise<TasksDayTime> {
        return this.DaysSerivce.GetTaskDayTimeByID(id);
    }
    @Post('add/:task')
    async AddTaskDayTime(
        @Body() day,
        @Param('task', ParseIntPipe) t: number,
    ): Promise<TasksDayTime> {
        return this.DaysSerivce.AddTaskDayTime(day, t);
    }
    @Patch('update/:id')
    async UpdateTaskDayTime(
        @Param('id', ParseIntPipe) id: number,
        @Body() task: UpdateTaskDayTimeDto,
    ): Promise<TasksDayTime> {
        return await this.DaysSerivce.UpdateTaskDayTime(id, task);
    }
    @Delete('delete/:id')
    async DeletTaskDayTime(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.DaysSerivce.RemovaTaskDayTime(id);
    }
    @Get('getbydate/:dd/:df')
    async Getdaytask(
        @Param('dd') debut: Date,
        @Param('df') fin: Date,
    ): Promise<TasksDayTime[]> {
        const dateDebut = new Date(debut);
        const isoDateStrDebut = dateDebut.toISOString();
        console.log("date debut :", isoDateStrDebut);
        const dateFin = new Date(fin);
        const isoDateStrfin = dateFin.toISOString();
        console.log("Date Fin", isoDateStrfin)
        return await this.DaysSerivce.getTaskDayTimeByDate(isoDateStrDebut, isoDateStrfin);
    }
    @Get('getByUser/:id')
    async getTaskDayTimeByUser(@Param('id') userId: number): Promise<TasksDayTime[]> {
        return await this.DaysSerivce.getTaskDayTimeByUserId(userId);
    }

}
