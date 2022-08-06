import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controller/artist.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity]), AuthModule],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistModule],
})
export class ArtistModule {}
