import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController, ArtistService } from './Artist';
import { AlbumController, AlbumService } from './Album';
import { TrackController, TrackService } from './Track';
import { FavouriteController, FavouriteService } from './Favourite';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest-service',
      entities: [UserEntity],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [
    AppController,
    ArtistController,
    AlbumController,
    TrackController,
    FavouriteController,
  ],
  providers: [
    AppService,
    ArtistService,
    AlbumService,
    TrackService,
    FavouriteService,
  ],
})
export class AppModule {}
