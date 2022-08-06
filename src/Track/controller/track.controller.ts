import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { TrackService } from '../services/track.service';
import { DeleteType } from '../../general.schema';
import { TrackSchema } from '../schemas/track.schema';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(AuthGuard('local'))
  @Get()
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async findAll(): Promise<TrackSchema[]> {
    return this.trackService.findAll();
  }

  @UseGuards(AuthGuard('local'))
  @Get(':id')
  @Header('Content-type', 'application/json')
  async findOne(@Param('id') id: string): Promise<TrackSchema> {
    return await this.trackService.findOne(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post()
  @HttpCode(201)
  @Header('Content-type', 'application/json')
  async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackSchema> {
    return await this.trackService.create(createTrackDto);
  }

  @UseGuards(AuthGuard('local'))
  @Put(':id')
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackSchema> {
    return await this.trackService.update(id, updateTrackDto);
  }

  @UseGuards(AuthGuard('local'))
  @Delete(':id')
  @HttpCode(204)
  @Header('Content-type', 'application/json')
  async delete(@Param('id') id: string): Promise<DeleteType> {
    return await this.trackService.delete(id);
  }
}
