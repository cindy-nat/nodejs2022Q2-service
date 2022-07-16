import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { DeleteType } from '../../general.schema';
import { AlbumSchema } from '../schemas/album.schema';
import { AlbumService } from '../services/album.service';
import {CreateAlbumDto} from "../dto/create-album.dto";
import {UpdateAlbumDto} from "../dto/update-album.dto";

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async findAll(): Promise<AlbumSchema[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  async findOne(@Param('id') id: string): Promise<AlbumSchema> {
    return await this.albumService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @Header('Content-type', 'application/json')
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumSchema> {
    return await this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumSchema> {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Header('Content-type', 'application/json')
  async delete(@Param('id') id: string): Promise<DeleteType> {
    return await this.albumService.delete(id);
  }
}
