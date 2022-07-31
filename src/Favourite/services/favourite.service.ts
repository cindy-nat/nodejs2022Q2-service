import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavouriteSchema } from '../schemas/favourite.schema';
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

  async findAll(): Promise<FavouriteSchema> {
    const result = {
      artists: [],
      albums: [],
      tracks: [],
    };
    const data = await this.favouriteRepository.find();

    console.log(data)
    if(data.length) {
      for (const artist of data[0].artistIds) {
        const artistData = await this.artistRepository.findBy({ id: artist });
        result.artists.push(artistData);
      }

      for (const album of data[0].albumIds) {
        const albumData = await this.albumRepository.findBy({ id: album });
        result.albums.push(albumData);
      }

      for (const track of data[0].trackIds) {
        const trackData = await this.trackRepository.findBy({ id: track });
        console.log(trackData)
        result.tracks.push(trackData);
      }
    }

    return result
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

    if(data.length === 0) {
      const table = this.favouriteRepository.create({
        trackIds: [],
        albumIds: [],
        artistIds: [],
      });
      await this.favouriteRepository.save(table);
    }

    const newData = await this.favouriteRepository.find();

    newData[0].trackIds = [...newData[0].trackIds, id];

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

    if (data.length) {
      data[0].albumIds = [...data[0].albumIds, id];
    } else {
      this.favouriteRepository.create({ albumIds: [id] });
    }

    return album;
  }

  async addArtistToFav(id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const artist = this.artistRepository.findOneBy({ id: id });

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    const data = await this.favouriteRepository.find();


    if(data.length) {
      data[0].artistIds = [...data[0].artistIds, id];
    } else {
      this.favouriteRepository.create({ artistIds: [id] });
    }

    return artist;
  }

  async deleteTrackFromFav(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const data = await this.favouriteRepository.find();
    const favTrack = data[0].trackIds.find((track) => track === id);

    if (!favTrack) {
      throw new NotFoundException();
    }

    data[0].trackIds = data[0].trackIds.filter((track) => track !== id)

    return { deleted: true };
  }

  async deleteAlbumFromFav(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const data = await this.favouriteRepository.find();
    const favAlbum = data[0].albumIds.find((album) => album === id);

    if (!favAlbum) {
      throw new NotFoundException();
    }

    data[0].albumIds = data[0].albumIds.filter((album) => album !== id)

    return { deleted: true };
  }

  async deleteArtistFromFav(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const data = await this.favouriteRepository.find();
    const favArtist = data[0].artistIds.find((artist) => artist === id);

    if (!favArtist) {
      throw new NotFoundException();
    }

    data[0].artistIds = data[0].artistIds.filter((artist) => artist !== id)

    return { deleted: true };
  }
}
