import { Repository } from 'typeorm';
import { ClientEntity } from './entity/client.entity';
import { AddClientDto } from './dto/AddClientDto';
import { UpdateclientDto } from './dto/UpdateclientDto';
import { ProjectService } from '../project/project.service';
import { ProjectEntity } from '../project/entity/project.entity';
export declare class ClientService {
    private ClientRepo;
    private projectrepo;
    private ProjectServiice;
    constructor(ClientRepo: Repository<ClientEntity>, projectrepo: Repository<ProjectEntity>, ProjectServiice: ProjectService);
    GetClients(): Promise<ClientEntity[]>;
    GetClinetById(id: number): Promise<ClientEntity>;
    AddClient(client: AddClientDto): Promise<ClientEntity>;
    UpdateClient(id: number, client: UpdateclientDto, projid: number): Promise<ClientEntity>;
    RemoveClient(id: number): Promise<ClientEntity>;
}
