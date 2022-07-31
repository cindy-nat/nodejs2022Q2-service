import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteEntity } from './entity/favourite.entity';
import { FavouriteService } from './services/favourite.service';
import { FavouriteController } from './controller/favourite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FavouriteEntity])],
  providers: [FavouriteService],
  controllers: [FavouriteController],
})
export class FavouriteModule {}
