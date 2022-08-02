import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { TaskEntity } from '../../task/entities/task.entity';

import { ClientEntity } from '../../client/entity/client.entity';

@Entity('project')
export class ProjectEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  state: string;
  @Column({ type: 'date' })
  DL: Date;
  @OneToMany((type) => TaskEntity, (task) => task.project, {
    eager: true,
  })
  tasks: TaskEntity[];
  @ManyToOne((type) => ClientEntity, (client) => client.projects, {
    eager: true,
  })
  client: ClientEntity;
}
