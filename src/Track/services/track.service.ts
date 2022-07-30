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

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    // @Inject(forwardRef(() => FavouriteService))
    // private favouriteService: FavouriteService,
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

  async create(createTrackDto: CreateTrackDto): Promise<TrackSchema> {
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
