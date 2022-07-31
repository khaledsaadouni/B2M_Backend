import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

import {ProjectEntity} from '../../project/entity/project.entity';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phone: number;
  @OneToMany((type) => ProjectEntity, (project) => project.client, {
    cascade: true,
  })
  projects: ProjectEntity[];
}
