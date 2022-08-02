import { Injectable, NotFoundException } from '@nestjs/common';

import { ProjectEntity } from './entity/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateproDto } from './dto/UpdateproDto';
import { TaskEntity } from '../task/entities/task.entity';
import { ClientEntity } from '../client/entity/client.entity';
import { DaysEntity } from '../days/entity/days.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepo: Repository<ProjectEntity>,
    @InjectRepository(TaskEntity)
    private TaskRepo: Repository<TaskEntity>,
    @InjectRepository(ClientEntity)
    private ClientRepo: Repository<ClientEntity>,

    @InjectRepository(DaysEntity)
    private DaysRepo: Repository<DaysEntity>,
  ) {}
  async GetProjects(): Promise<ProjectEntity[]> {
    return await this.projectRepo.find();
  }
  async GetProjectById(id: number): Promise<ProjectEntity> {
    return await this.projectRepo.findOneBy({ id });
  }
  async AddProject(project, id): Promise<ProjectEntity> {
    project.client = await this.ClientRepo.findOneBy({ id });
    return await this.projectRepo.save(project);
  }
  async UpdateProject(
    id: number,
    project: UpdateproDto,
    idc: number,
  ): Promise<ProjectEntity> {
    const newproject = await this.projectRepo.preload({ id, ...project });
    if (!newproject) {
      throw new NotFoundException('The specefied project does not exist');
    }
    newproject.client = await this.ClientRepo.findOne({
      where: {
        id: idc,
      },
    });
    return await this.projectRepo.save(newproject);
  }
  async RemoveProject(id: number) {
    const p = await this.GetProjectById(id);
    // const pro = await this.projectRepo.findOneBy({ id });
    // return await this.projectRepo.remove(pro);
    for (const t of p.tasks) {
      for (const d of t.days) {
        this.DaysRepo.remove(d);
      }
      this.TaskRepo.remove(t);
    }
    return await this.projectRepo.delete(id);
  }
}
