import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {TaskEntity} from './entities/task.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {AddTaskDto} from './dto/AddTaskDto';
import {UpdateTaskDto} from './dto/UpdateTaskDto';
import {ProjectService} from '../project/project.service';
import {DaysEntity} from '../days/entity/days.entity';
import {UserEntity} from '../user/entity/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private TaskRepo: Repository<TaskEntity>,
    private projectservice: ProjectService,
    @InjectRepository(DaysEntity)
    private DaysRepo: Repository<DaysEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async GetTasks(): Promise<TaskEntity[]> {
    return await this.TaskRepo.find();
  }
  async GetTaskByID(id: number): Promise<TaskEntity> {
    return await this.TaskRepo.findOneBy({ id });
  }
  async AddTask(
    Task: AddTaskDto,
    projID: number,
    id: number,
  ): Promise<TaskEntity> {
    const p = await this.projectservice.GetProjectById(projID);
    const t = new TaskEntity();
    t.task = Task.task;
    t.project = p;
    t.user = await this.userRepository.findOneBy({ id });
    return await this.TaskRepo.save(t);
  }
  async UpdateTask(
    id: number,
    task: UpdateTaskDto,
    iddev: number,
  ): Promise<TaskEntity> {
    const newtask = await this.TaskRepo.preload({ id, ...task });
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :iddev ', {
        iddev,
      })
      .getOne();
    if (user) {
      newtask.user = user;
    }
    if (!newtask) {
      throw new NotFoundException('The specefied task does not exist');
    }
    return await this.TaskRepo.save(newtask);
  }
  async RemoveTask(id: number) {
    const pro = await this.TaskRepo.findOneBy({ id });
    for (const t of pro.days) {
      this.DaysRepo.remove(t);
    }
    return await this.TaskRepo.remove(pro);
  }
  async GetTasksProject(id): Promise<TaskEntity[]> {
    // const p = await this.projectservice.GetProjectById(id);

    const qb = this.TaskRepo.createQueryBuilder('task');
    return await qb.select('').where(`task.projectId = ${id}`).getMany();
  }
}
