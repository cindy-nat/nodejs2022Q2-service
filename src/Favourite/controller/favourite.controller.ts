import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post, UseGuards,
} from '@nestjs/common';
import { FavouriteService } from '../services/favourite.service';
import { TrackSchema } from '../../Track';
import { DeleteType } from '../../general.schema';
import { AlbumSchema } from '../../Album';
import { Artist } from '../../Artist';
import { FavouriteEntity } from '../entity/favourite.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('favs')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @UseGuards(AuthGuard('local'))
  @Get()
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async findAll(): Promise<FavouriteEntity> {
    return this.favouriteService.findAll();
  }

  @UseGuards(AuthGuard('local'))
  @Post('track/:id')
  @HttpCode(201)
  @Header('Content-type', 'application/json')
  async addTrackToFav(@Param('id') id: string): Promise<TrackSchema> {
    return this.favouriteService.addTrackToFav(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('album/:id')
  @HttpCode(201)
  @Header('Content-type', 'application/json')
  async addAlbumToFav(@Param('id') id: string): Promise<AlbumSchema> {
    return this.favouriteService.addAlbumToFav(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('artist/:id')
  @HttpCode(201)
  @Header('Content-type', 'application/json')
  async addArtistToFav(@Param('id') id: string): Promise<Artist> {
    return this.favouriteService.addArtistToFav(id);
  }

  @UseGuards(AuthGuard('local'))
  @Delete('track/:id')
  @HttpCode(204)
  @Header('Content-type', 'application/json')
  async deleteTrackFromFav(@Param('id') id: string): Promise<DeleteType> {
    return this.favouriteService.deleteTrackFromFav(id);
  }

  @UseGuards(AuthGuard('local'))
  @Delete('album/:id')
  @HttpCode(204)
  @Header('Content-type', 'application/json')
  async deleteAlbumFromFav(@Param('id') id: string): Promise<DeleteType> {
    return this.favouriteService.deleteAlbumFromFav(id);
  }

  @UseGuards(AuthGuard('local'))
  @Delete('artist/:id')
  @HttpCode(204)
  @Header('Content-type', 'application/json')
  async deleteArtistFromFav(@Param('id') id: string): Promise<DeleteType> {
    return this.favouriteService.deleteArtistFromFav(id);
  }
}
