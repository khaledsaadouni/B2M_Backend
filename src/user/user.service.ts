import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CurrentEntity } from '../current_tasks/entity/current.entity';
import { CurrentTasksService } from '../current_tasks/current_tasks.service';
import { TaskEntity } from '../task/entities/task.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TaskEntity)
    private TaskRepo: Repository<TaskEntity>,
    private jwtService: JwtService,
    private currentservice: CurrentTasksService,
    @InjectRepository(CurrentEntity)
    private currentRepo: Repository<CurrentEntity>,
  ) { }

  async getcurrent(id): Promise<CurrentEntity> {
    const u = await this.userRepository.findOneBy({ id });
    return this.currentservice.getCurrent(u.current.id);
  }

  async register(userData): Promise<Partial<UserEntity>> {
    const user = new UserEntity();
    user.username = userData.username;
    user.password = userData.password;
    user.name = userData.name;
    user.firstname = userData.firstname;
    user.job = userData.job;
    const c = this.currentservice.createCurrent();
    user.current = await c;
    user.email = userData.email;
    user.phone = userData.phone;
    user.role = userData.role;
    user.gender = userData.gender;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);

    await this.userRepository.save(user);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  async getloggeduser(id): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  async login(credentials) {
    //
    // Récupére le login et le mot de passe
    //
    const username = credentials.email;
    const password = credentials.password;
    // On peut se logger ou via le username ou le password
    // Vérifier est ce qu'il y a un user avec ce login ou ce mdp
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username or user.email = :username', {
        username,
      })
      .getOne();
    // console.log(user);
    // Si not user je déclenche une erreur

    if (!user)
      throw new NotFoundException(
        'username ou password erronée c=>' +
        credentials.email +
        ' p=>' +
        credentials.password,
      );
    // Si oui je vérifie est ce que le mot est correct ou pas
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        access_token: jwt,
        id: user.id,
      };
    } else {
      console.log(user.email + ' ' + user.password);
      // Si mot de passe incorrect je déclenche une erreur
      throw new NotFoundException('username ou password erronée u');
    }
  }

  async GetUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async delete(id): Promise<any> {
    const u = await this.userRepository.findOneBy({ id });
    u.current = null;
    this.userRepository.save(u);
    for (const t of u.tasks) {
      t.user = null;
      this.TaskRepo.save(t);
    }
    return await this.userRepository.delete(id);
  }

  async UpdateUser(id: number, user): Promise<UserEntity> {
    if (!user.role) {
      delete user.role;
    }
    if (user.password) {
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, user.salt);
    } else {
      delete user.password;
    }
    const newuser = await this.userRepository.preload({ id, ...user });
    if (!newuser) {
      throw new NotFoundException('The specefied user does not exist');
    }
    return await this.userRepository.save(newuser);
  }

  async Getdevs(): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { role: 'dev' } });
  }
}
