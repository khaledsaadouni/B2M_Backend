import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';
import {UserService} from './user.service';
import {UserEntity} from './entity/user.entity';
import {CurrentEntity} from '../current_tasks/entity/current.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signin')
  register(@Body() userData) {
    return this.userService.register(userData);
  }

  @Post('login')
  login(@Body() credentials) {
    return this.userService.login(credentials);
  }
  @Get('/:id')
  getloggeduser(@Param('id') id): Promise<UserEntity> {
    return this.userService.getloggeduser(id);
  }
  @Get('current/:id')
  getcurrentuser(@Param('id') id): Promise<CurrentEntity> {
    return this.userService.getcurrent(id);
  }
  @Get('u/dev')
  getDevs(): Promise<UserEntity[]> {
    return this.userService.Getdevs();
  }
  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.userService.GetUsers();
  }

  @Delete('delete/:id')
  async Delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.userService.delete(id);
  }

  @Patch('update/:id')
  async UpdateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user,
  ): Promise<UserEntity> {
    return await this.userService.UpdateUser(id, user);
  }
}
