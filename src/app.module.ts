import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController, UserService } from './user';
import { ArtistController, ArtistService } from './Artist';

@Module({
  imports: [],
  controllers: [AppController, UserController, ArtistController],
  providers: [AppService, UserService, ArtistService],
})
export class AppModule {}
