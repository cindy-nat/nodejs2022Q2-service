import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entity/track.entity';
import { TrackService } from './services/track.service';
import { TrackController } from './controller/track.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
