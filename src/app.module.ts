import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController, UserService } from './user';
import { ArtistController, ArtistService } from './Artist';
import { AlbumController, AlbumService } from './Album';
import { TrackController, TrackService } from './Track';
import { FavouriteController, FavouriteService } from './Favourite';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    AlbumController,
    TrackController,
    FavouriteController,
  ],
  providers: [
    AppService,
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
    FavouriteService,
  ],
})
export class AppModule {}
