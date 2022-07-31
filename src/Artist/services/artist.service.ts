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
import { AlbumEntity } from '../../Album/entity/album.entity';
import { TrackEntity } from '../../Track/entity/track.entity';
import { AppDataSource } from '../../../data-source';

@Injectable()
export class ArtistService {
  private trackRepository: Repository<TrackEntity>;
  private albumRepository: Repository<AlbumEntity>;
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>, // @Inject(forwardRef(() => AlbumService)) // private albumService: AlbumService, // @Inject(forwardRef(() => TrackService)) // private trackService: TrackService, // @Inject(forwardRef(() => FavouriteService)) // private favouriteService: FavouriteService,
  ) {
    this.trackRepository = AppDataSource.getRepository('track_entity');
    this.albumRepository = AppDataSource.getRepository('album_entity');
  }

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

    const albums = await this.albumRepository.findBy({ artistId: id });
    if (albums.length) {
      for (const album of albums) {
        await this.albumRepository.update(album.id, { artistId: null });
      }
    }

    const tracks = await this.trackRepository.findBy({ artistId: id });
    if (tracks.length) {
      for (const track of tracks) {
        await this.trackRepository.update(track.id, { artistId: null });
      }
    }

    // data.favourites.artists = data.favourites.artists.filter(
    //   (favArtist) => favArtist !== id,
    // );
    // await this.favouriteService.deleteArtistFromFav(id);

    const deleted = await this.artistRepository.remove(artist);

    return { deleted: Boolean(deleted) };
  }
}
