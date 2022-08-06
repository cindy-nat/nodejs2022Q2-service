import {
  Body,
  Controller,
  Header,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, User } from '../user';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  @Header('Content-type', 'application/json')
  @Post('/login')
  async login(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(200)
  @Post('/refresh')
  async refresh(@Body() token: { refreshToken: '' }) {
    return this.authService.refresh(token.refreshToken);
  }
}
