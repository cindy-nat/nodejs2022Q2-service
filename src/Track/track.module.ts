import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entity/track.entity';
import { TrackService } from './services/track.service';
import { TrackController } from './controller/track.controller';
import { AlbumModel } from '../Album/album.model';
import { ArtistModule } from '../Artist/artist.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), AlbumModel, ArtistModule],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackModule],
})
export class TrackModule {}
