import { ClientService } from './client.service';
import { ClientEntity } from './entity/client.entity';
export declare class ClientController {
    private clientservice;
    constructor(clientservice: ClientService);
    GetClients(): Promise<ClientEntity[]>;
    GetClient(id: number): Promise<ClientEntity>;
    Addclient(c: any): Promise<ClientEntity>;
    deleteClient(id: number): Promise<ClientEntity>;
}
