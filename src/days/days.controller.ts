import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';
import {DaysService} from './days.service';
import {DaysEntity} from './entity/days.entity';
import {UpdateDayDto} from './dto/UpdateDayDt';

@Controller('days')
export class DaysController {
  constructor(private DaysSerivce: DaysService) {}
  @Get('all')
  async GetTasks(): Promise<DaysEntity[]> {
    return this.DaysSerivce.GetDays();
  }
  @Post('add/:task')
  async AddDay(
    @Body() day,
    @Param('task', ParseIntPipe) t: number,
  ): Promise<DaysEntity> {
    return this.DaysSerivce.AddDay(day, t);
  }
  @Patch('update/:id')
  async UpdateDay(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateDayDto,
  ): Promise<DaysEntity> {
    return await this.DaysSerivce.UpdateDay(id, task);
  }
  @Delete('delete/:id')
  async DeletDay(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.DaysSerivce.RemovaDay(id);
  }
  @Get(':tid/:d/:m/:y')
  async Getdaytask(
    @Param('tid') t: number,
    @Param('d') d: number,
    @Param('m') m: number,
    @Param('y') y: number,
  ): Promise<DaysEntity> {
    return await this.DaysSerivce.daytask(t, d, m, y);
  }
}
