import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavouriteController, FavouriteService } from './Favourite';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { ArtistModule } from "./Artist/artist.module";
import typeOrmConfig = require("../typeorm.config");
import { AlbumModel } from "./Album/album.model";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    ArtistModule,
    AlbumModel,
  ],
  controllers: [AppController, FavouriteController],
  providers: [AppService, FavouriteService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
