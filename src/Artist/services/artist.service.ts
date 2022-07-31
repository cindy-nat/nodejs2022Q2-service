import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from '../schemas/artist.schema';
import { validate } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { DeleteType } from '../../general.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>, // @Inject(forwardRef(() => AlbumService)) // private albumService: AlbumService, // @Inject(forwardRef(() => TrackService)) // private trackService: TrackService, // @Inject(forwardRef(() => FavouriteService)) // private favouriteService: FavouriteService,
  ) {}

  async findAll(): Promise<ArtistEntity[]> {
    return this.artistRepository.find();
  }

  async findOne(id: string): Promise<ArtistEntity> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const artist = await this.findArtist(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async findArtist(id: string): Promise<ArtistEntity> {
    return this.artistRepository.findOneBy({ id: id });
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.create({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    return await this.artistRepository.save(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const artist = await this.findOne(id);

    artist.name = updateArtistDto.name || artist.name;
    artist.grammy =
      typeof updateArtistDto.grammy === 'boolean'
        ? updateArtistDto.grammy
        : artist.grammy;

    return artist;
  }

  async delete(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const artist = await this.findOne(id);

    // const album = await this.albumService.findOneByArtistId(artist.id);
    // if (album) {
    //   await this.albumService.update(album.id, { artistId: null });
    // }

    // const trackIndex = data.tracks.findIndex((track) => track.artistId === id);

    // if (trackIndex >= 0) {
    //   data.tracks[trackIndex].artistId = null;
    // }

    // data.favourites.artists = data.favourites.artists.filter(
    //   (favArtist) => favArtist !== id,
    // );
    // await this.favouriteService.deleteArtistFromFav(id);

    const deleted = await this.artistRepository.remove(artist);

    return { deleted: Boolean(deleted) };
  }
}
