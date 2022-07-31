import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';
import {ProjectService} from './project.service';
import {ProjectEntity} from './entity/project.entity';
import {UpdateproDto} from './dto/UpdateproDto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Get('all')
  async GetAll(): Promise<ProjectEntity[]> {
    return await this.projectService.GetProjects();
  }
  @Post('add/:cid')
  async AddProject(
    @Body() proj,
    @Param('cid', ParseIntPipe) cid: number,
  ): Promise<ProjectEntity> {
    return await this.projectService.AddProject(proj, cid);
  }
  @Patch('update/:id/:cid')
  async UpdateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() proj: UpdateproDto,
    @Param('cid') cid: number,
  ): Promise<ProjectEntity> {
    return await this.projectService.UpdateProject(id, proj, cid);
  }
  @Delete('delete/:id')
  async DeleteProject(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.projectService.RemoveProject(id);
  }
}
