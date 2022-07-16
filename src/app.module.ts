import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController, UserService } from './user';
import { ArtistController, ArtistService } from './Artist';
import { AlbumController, AlbumService } from './Album';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    AlbumController,
  ],
  providers: [AppService, UserService, ArtistService, AlbumService],
})
export class AppModule {}
