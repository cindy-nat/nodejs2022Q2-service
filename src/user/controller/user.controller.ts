import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteType } from '../../general.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  async findOne(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    return await this.userService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @Header('Content-type', 'application/json')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Header('Content-type', 'application/json')
  async delete(@Param('id') id: string): Promise<DeleteType> {
    return await this.userService.delete(id);
  }
}
