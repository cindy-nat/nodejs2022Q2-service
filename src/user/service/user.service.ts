import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { data } from '../../data';
import { validate } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteType } from '../../general.schema';

@Injectable()
export class UserService {
  getUserWithoutPassword(user: User) {
    return {
      login: user.login,
      id: user.id,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return data.users.map((user) => this.getUserWithoutPassword(user));
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const user = data.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.getUserWithoutPassword(user);
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = {
      login: createUserDto.login,
      password: createUserDto.password,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    data.users.push(user);
    return this.getUserWithoutPassword(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const user = data.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    const oldPassword = user.password;

    if (updateUserDto.oldPassword !== oldPassword) {
      throw new ForbiddenException();
    }

    const userIndex = data.users.findIndex((user) => user.id === id);

    data.users[userIndex].password = updateUserDto.newPassword;
    data.users[userIndex].version = data.users[userIndex].version + 1;
    data.users[userIndex].updatedAt = Date.now();

    return this.findOne(id);
  }

  async delete(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const deleted = Boolean(await this.findOne(id));

    data.users = data.users.filter((user) => user.id !== id);

    return { deleted };
  }
}
