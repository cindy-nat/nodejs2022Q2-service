import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { Artist } from '../../Artist';
import { DeleteType } from '../../general.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '../../Artist/entity/artist.entity';
import { Repository } from 'typeorm';
import { FavouriteEntity } from '../entity/favourite.entity';
import { AlbumEntity } from '../../Album/entity/album.entity';
import { TrackEntity } from '../../Track/entity/track.entity';
import { AppDataSource } from '../../../data-source';

@Injectable()
export class FavouriteService {
  private trackRepository: Repository<TrackEntity>;
  private albumRepository: Repository<AlbumEntity>;
  private artistRepository: Repository<ArtistEntity>;
  constructor(
    @InjectRepository(FavouriteEntity)
    private favouriteRepository: Repository<FavouriteEntity>,
  ) {
    this.trackRepository = AppDataSource.getRepository('track_entity');
    this.albumRepository = AppDataSource.getRepository('album_entity');
    this.artistRepository = AppDataSource.getRepository('artist_entity');
  }

  async findAll(): Promise<FavouriteEntity> {
    const data = await this.favouriteRepository.find({
      relations: { artists: true, tracks: true, albums: true },
    });

    return data.length === 0
      ? await this.favouriteRepository.save({
          albums: [],
          artists: [],
          tracks: [],
        })
      : data[0];
  }

  async addTrackToFav(id: string): Promise<TrackEntity> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const track = await this.trackRepository.findOneBy({ id: id });
    if (!track) {
      throw new UnprocessableEntityException();
    }
    const data = await this.favouriteRepository.find();

    data[0].tracks.push(track);

    await this.favouriteRepository.save(data);

    return track;
  }

  async addAlbumToFav(id: string): Promise<AlbumEntity> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const album = await this.albumRepository.findOneBy({ id: id });

    if (!album) {
      throw new UnprocessableEntityException();
    }

    const data = await this.favouriteRepository.find();

    data[0].albums.push(album);

    await this.favouriteRepository.save(data);

    return album;
  }

  async addArtistToFav(id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const artist = await this.artistRepository.findOneBy({ id: id });

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    const data = await this.favouriteRepository.find();

    data[0].artists.push(artist);

    await this.favouriteRepository.save(data);

    return artist;
  }

  async deleteTrackFromFav(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const data = await this.favouriteRepository.find();

    data[0].tracks = data[0].tracks.filter((track) => track.id !== id);

    await this.favouriteRepository.save(data[0]);

    return { deleted: true };
  }

  async deleteAlbumFromFav(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const data = await this.favouriteRepository.find();

    data[0].albums = data[0].albums.filter((album) => album.id !== id);

    await this.favouriteRepository.save(data[0]);

    return { deleted: true };
  }

  async deleteArtistFromFav(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const data = await this.favouriteRepository.find();

    data[0].artists = data[0].artists.filter((art) => art.id !== id);

    await this.favouriteRepository.save(data[0]);

    return { deleted: true };
  }
}
