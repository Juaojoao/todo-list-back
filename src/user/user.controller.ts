import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  // @Post('/login')
  // async login(@Request() data: UserDTO) {
  //   return this.authService.signIn(data.email, data.password);
  // }

  @Patch()
  async updatePassword(@Body() data: UserDTO) {
    console.log('data', data);
    return this.userService.updatePassword(data.id, data.password);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
