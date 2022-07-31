import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { ArtistModule } from './Artist/artist.module';
import typeOrmConfig = require('../typeorm.config');
import { AlbumModel } from './Album/album.model';
import { TrackModule } from './Track/track.module';
import { FavouriteModule } from './Favourite/favourite.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    ArtistModule,
    AlbumModel,
    TrackModule,
    FavouriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
