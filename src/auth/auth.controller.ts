import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto, User } from '../user';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  @Header('Content-type', 'application/json')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.authService.create(createUserDto);
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }
}
