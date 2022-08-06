import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { AppDataSource } from '../../data-source';

@Injectable()
export class AuthService {
  private userRepository: Repository<UserEntity>;

  constructor(private jwtService: JwtService) {
    this.userRepository = AppDataSource.getRepository('user_entity');
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const users = await this.userRepository.findBy({ login: username });
    let user = null;
    for (let i = 0; i < users.length; i++) {
      const isPasswordMatched = bcrypt.compare(pass, users[i].password);
      if (isPasswordMatched) {
        user = users[i];
        break;
      }
    }
    if (!user) {
      throw new NotFoundException();
    }
    return user.toResponse();
  }

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(createUserDto.password, salt);

    const user = this.userRepository.create({
      login: createUserDto.login,
      password: hash,
      version: 1,
    });
    return (await this.userRepository.save(user)).toResponse();
  }

  async login(user: any) {
    const userData = await this.validateUser(user.login, user.password);
    const payload = { username: userData.login, sub: userData.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
