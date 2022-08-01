import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClientEntity } from './entity/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddClientDto } from './dto/AddClientDto';
import { UpdateclientDto } from './dto/UpdateclientDto';
import { ProjectService } from '../project/project.service';
import { ProjectEntity } from '../project/entity/project.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private ClientRepo: Repository<ClientEntity>,
    @InjectRepository(ProjectEntity)
    private projectrepo: Repository<ProjectEntity>,
    private ProjectServiice: ProjectService,
  ) {}
  async GetClients(): Promise<ClientEntity[]> {
    return await this.ClientRepo.find();
  }
  async GetClinetById(id: number): Promise<ClientEntity> {
    return await this.ClientRepo.findOneBy({ id });
  }
  async AddClient(client: AddClientDto): Promise<ClientEntity> {
    return await this.ClientRepo.save(client);
  }
  async UpdateClient(
    id: number,
    client: UpdateclientDto,
    projid: number,
  ): Promise<ClientEntity> {
    const update = await this.ClientRepo.preload({ id, ...client });
    if (projid != -1) {
      update.projects.push(await this.ProjectServiice.GetProjectById(projid));
    }
    return await this.ClientRepo.save(update);
  }
  async RemoveClient(id: number): Promise<ClientEntity> {
    const pro = await this.ClientRepo.findOneBy({ id });
    const t = await this.projectrepo
      .createQueryBuilder('project')
      .select('')
      .where('project.clientId= :id', { id })
      .getMany();
    for (const p of t) {
      p.client = null;
      this.projectrepo.save(p);
    }
    return await this.ClientRepo.remove(pro);
  }
}
