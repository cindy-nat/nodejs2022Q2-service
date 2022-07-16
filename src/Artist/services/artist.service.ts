import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { data } from '../../data';
import { Artist } from '../schemas/artist.schema';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { DeleteType } from '../../general.schema';

@Injectable()
export class ArtistService {
  async findAll(): Promise<Artist[]> {
    return data.artists;
  }

  async findOne(id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const artist = data.artists.find((user) => user.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = {
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
      id: uuidv4(),
    };
    data.artists.push(artist);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const artist = data.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    const artistIndex = data.artists.findIndex((artist) => artist.id === id);

    data.artists[artistIndex].name = updateArtistDto.name || artist.name;
    data.artists[artistIndex].grammy =
      typeof updateArtistDto.grammy === 'boolean'
        ? updateArtistDto.grammy
        : artist.grammy;

    return this.findOne(id);
  }

  async delete(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const deleted = Boolean(await this.findOne(id));

    data.artists = data.artists.filter((artist) => artist.id !== id);
    const albumIndex = data.albums.findIndex((album) => album.artistId === id);

    if (albumIndex >= 0) {
      data.albums[albumIndex].artistId = null;
    }

    return { deleted };
  }
}
