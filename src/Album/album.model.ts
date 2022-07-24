import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entity/album.entity';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controller/album.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModel {}
