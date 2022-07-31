import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entity/album.entity';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controller/album.controller';
import { ArtistModule } from '../Artist/artist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity])
  ],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumModel],
})
export class AlbumModel {}
