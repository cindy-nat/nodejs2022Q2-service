import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumSchema } from '../schemas/album.schema';
import { data } from '../../data';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { DeleteType } from '../../general.schema';

@Injectable()
export class AlbumService {
  async findAll(): Promise<AlbumSchema[]> {
    return data.albums;
  }

  async findOne(id): Promise<AlbumSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const album = data.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  findArtist(id) {
    return data.artists.find((artist) => id === artist.id);
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumSchema> {
    const artist = this.findArtist(createAlbumDto.artistId);

    const album = {
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: artist ? createAlbumDto.artistId : null,
      id: uuidv4(),
    };
    data.albums.push(album);
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const album = data.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    const albumIndex = data.albums.findIndex((artist) => artist.id === id);
    const artist = this.findArtist(updateAlbumDto.artistId);

    data.albums[albumIndex].name = updateAlbumDto.name || album.name;
    data.albums[albumIndex].year = updateAlbumDto.year || album.year;
    data.albums[albumIndex].artistId = artist
      ? updateAlbumDto.artistId
      : album.artistId;

    return this.findOne(id);
  }

  async delete(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const deleted = Boolean(await this.findOne(id));

    const trackIndex = data.tracks.findIndex((track) => track.albumId === id);

    if (trackIndex >= 0) {
      data.tracks[trackIndex].albumId = null;
    }

    data.albums = data.albums.filter((album) => album.id !== id);

    return { deleted };
  }
}
