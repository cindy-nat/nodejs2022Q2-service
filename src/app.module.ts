import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController, UserService } from './user';
import { ArtistController, ArtistService } from './Artist';
import { AlbumController, AlbumService } from './Album';
import { TrackController, TrackService } from './Track';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    AlbumController,
    TrackController,
  ],
  providers: [
    AppService,
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
  ],
})
export class AppModule {}
