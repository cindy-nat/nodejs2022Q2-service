import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackSchema } from '../schemas/track.schema';
import { data } from '../../data';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { DeleteType } from '../../general.schema';

@Injectable()
export class TrackService {
  async findAll(): Promise<TrackSchema[]> {
    return data.tracks;
  }

  async findOne(id): Promise<TrackSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const track = data.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  findArtist(id) {
    return data.artists.find((artist) => id === artist.id);
  }

  findAlbum(id) {
    return data.albums.find((album) => id === album.id);
  }

  async create(createTrackDto: CreateTrackDto): Promise<TrackSchema> {
    const artist = this.findArtist(createTrackDto.artistId);
    const album = this.findAlbum(createTrackDto.albumId);

    const track = {
      name: createTrackDto.name,
      artistId: artist ? createTrackDto.artistId : null,
      albumId: album ? createTrackDto.albumId : null,
      duration: createTrackDto.duration,
      id: uuidv4(),
    };
    data.tracks.push(track);
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const track = data.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    const trackIndex = data.tracks.findIndex((track) => track.id === id);
    const artist = this.findArtist(updateTrackDto.artistId);
    const album = this.findAlbum(updateTrackDto.albumId);

    data.tracks[trackIndex].name = updateTrackDto.name || track.name;
    data.tracks[trackIndex].duration =
      updateTrackDto.duration || track.duration;
    data.tracks[trackIndex].artistId = artist
      ? updateTrackDto.artistId
      : track.artistId;
    data.tracks[trackIndex].albumId = album
      ? updateTrackDto.albumId
      : track.albumId;

    return this.findOne(id);
  }

  async delete(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const deleted = Boolean(await this.findOne(id));

    data.tracks = data.tracks.filter((track) => track.id !== id);

    data.favourites.tracks = data.favourites.tracks.filter(
      (favTrack) => favTrack !== id,
    );

    return { deleted };
  }
}
