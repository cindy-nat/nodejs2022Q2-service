import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackSchema } from '../schemas/track.schema';
import { validate } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { DeleteType } from '../../general.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from '../../Album';
import { FavouriteService } from '../../Favourite';
import { TrackEntity } from '../entity/track.entity';
import { ArtistService } from '../../Artist';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => FavouriteService))
    private favouriteService: FavouriteService,
  ) {}

  async findAll(): Promise<TrackSchema[]> {
    return this.trackRepository.find();
  }

  async findOne(id): Promise<TrackSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const track = await this.trackRepository.findOneBy({ id: id });
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  findArtist(id) {
    return this.artistService.findArtist(id);
  }

  findAlbum(id) {
    return this.albumService.findAlbum(id);
  }

  async create(createTrackDto: CreateTrackDto): Promise<TrackSchema> {
    const artist = await this.findArtist(createTrackDto.artistId);
    const album = await this.findAlbum(createTrackDto.albumId);

    return this.trackRepository.create({
      name: createTrackDto.name,
      artistId: artist ? createTrackDto.artistId : null,
      albumId: album ? createTrackDto.albumId : null,
      duration: createTrackDto.duration,
    });
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const track = await this.findOne(id);

    const artist = this.findArtist(updateTrackDto.artistId);
    const album = this.findAlbum(updateTrackDto.albumId);

    track.name = updateTrackDto.name || track.name;
    track.duration = updateTrackDto.duration || track.duration;
    track.artistId = artist ? updateTrackDto.artistId : track.artistId;
    track.albumId = album ? updateTrackDto.albumId : track.albumId;

    return track;
  }

  async delete(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const track = await this.findOne(id);

    // data.favourites.tracks = data.favourites.tracks.filter(
    //   (favTrack) => favTrack !== id,
    // );

    const deleted = this.trackRepository.remove(track);

    return { deleted: Boolean(deleted) };
  }
}
