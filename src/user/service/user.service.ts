import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { validate } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteType } from '../../general.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user.toResponse();
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
    });
    return (await this.usersRepository.save(user)).toResponse();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException();
    }

    const oldPassword = user.password;

    if (updateUserDto.oldPassword !== oldPassword) {
      throw new ForbiddenException();
    }

    user.password = updateUserDto.newPassword;
    user.version = user.version + 1;

    await this.usersRepository.save(user);

    return user.toResponse();
  }

  async delete(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException();
    }
    const deleted = await this.usersRepository.remove(user);

    return { deleted: Boolean(deleted) };
  }
}
