import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientEntity } from './entity/client.entity';

@Controller('client')
export class ClientController {
  constructor(private clientservice: ClientService) {}
  @Get('all')
  async GetClients(): Promise<ClientEntity[]> {
    return this.clientservice.GetClients();
  }
  @Get('/:id')
  async GetClient(@Param('id') id: number) {
    return this.clientservice.GetClinetById(id);
  }
  @Post('add')
  async Addclient(@Body() c): Promise<ClientEntity> {
    return this.clientservice.AddClient(c);
  }
  @Delete('delete/:id')
  deleteClient(@Param('id') id: number): Promise<ClientEntity> {
    return this.clientservice.RemoveClient(id);
  }
}
