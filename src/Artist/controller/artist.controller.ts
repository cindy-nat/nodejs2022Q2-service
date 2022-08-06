import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Delete, UseGuards,
} from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../schemas/artist.schema';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { DeleteType } from '../../general.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(AuthGuard('local'))
  @Get()
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @UseGuards(AuthGuard('local'))
  @Get(':id')
  @Header('Content-type', 'application/json')
  async findOne(@Param('id') id: string): Promise<Artist> {
    return await this.artistService.findOne(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post()
  @HttpCode(201)
  @Header('Content-type', 'application/json')
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistService.create(createArtistDto);
  }

  @UseGuards(AuthGuard('local'))
  @Put(':id')
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.update(id, updateArtistDto);
  }

  @UseGuards(AuthGuard('local'))
  @Delete(':id')
  @HttpCode(204)
  @Header('Content-type', 'application/json')
  async delete(@Param('id') id: string): Promise<DeleteType> {
    return await this.artistService.delete(id);
  }
}
