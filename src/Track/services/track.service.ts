import {
  BadRequestException,
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
import { TrackEntity } from '../entity/track.entity';
import { AppDataSource } from '../../../data-source';
import { ArtistEntity } from '../../Artist/entity/artist.entity';
import { AlbumEntity } from '../../Album/entity/album.entity';

@Injectable()
export class TrackService {
  private artistsRepository: Repository<ArtistEntity>;
  private albumRepository: Repository<AlbumEntity>;

  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>, // @Inject(forwardRef(() => FavouriteService)) // private favouriteService: FavouriteService,
  ) {
    this.artistsRepository = AppDataSource.getRepository('artist_entity');
    this.albumRepository = AppDataSource.getRepository('album_entity');
  }

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

  async create(createTrackDto: CreateTrackDto): Promise<TrackSchema> {
    if (createTrackDto.artistId && !validate(createTrackDto.artistId)) {
      throw new BadRequestException();
    }

    if(createTrackDto.artistId) {
      const artist = await this.artistsRepository.findBy({
        id: createTrackDto.artistId,
      });

      if (!artist.length) {
        throw new NotFoundException('Artist not found')
      }
    }

    if (createTrackDto.albumId && !validate(createTrackDto.albumId)) {
      throw new BadRequestException();
    }

    if(createTrackDto.albumId) {
      const album = await this.albumRepository.findBy({
        id: createTrackDto.albumId,
      });

      if (!album.length) {
        throw new NotFoundException('Artist not found')
      }
    }

    const track = await this.trackRepository.create({
      name: createTrackDto.name,
      artistId: createTrackDto.artistId ? createTrackDto.artistId : null,
      albumId: createTrackDto.albumId ? createTrackDto.albumId : null,
      duration: createTrackDto.duration,
    });

    return this.trackRepository.save(track);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const track = await this.findOne(id);

    track.name = updateTrackDto.name || track.name;
    track.duration = updateTrackDto.duration || track.duration;
    track.artistId = updateTrackDto.artistId
      ? updateTrackDto.artistId
      : track.artistId;
    track.albumId = updateTrackDto.albumId
      ? updateTrackDto.albumId
      : track.albumId;

    return track;
  }

  async delete(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const track = await this.findOne(id);

    const deleted = this.trackRepository.remove(track);

    return { deleted: Boolean(deleted) };
  }
}
