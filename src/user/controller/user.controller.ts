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
  UseGuards,
} from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteType } from '../../general.schema';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  @Header('Content-type', 'application/json')
  async delete(@Param('id') id: string): Promise<DeleteType> {
    return await this.userService.delete(id);
  }
}
