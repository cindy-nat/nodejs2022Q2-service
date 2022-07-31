import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumSchema } from '../schemas/album.schema';
import { validate } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { DeleteType } from '../../general.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../entity/album.entity';
import { ArtistService } from '../../Artist';
import { AppDataSource } from '../../../data-source';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async findAll(): Promise<AlbumSchema[]> {
    return this.albumRepository.find();
  }

  async findOne(id): Promise<AlbumSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const album = await this.albumRepository.findOneBy({ id: id });
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async findOneByArtistId(artistId): Promise<AlbumSchema> {
    return this.albumRepository.findOneBy({ artistId: artistId });
  }

  // async findArtist(artistId) {
  //   return this.artistService.findArtist(artistId);
  // }

  async findAlbum(id) {
    return this.albumRepository.findOneBy(id);
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumSchema> {
    if (createAlbumDto.artistId && !validate(createAlbumDto.artistId)) {
      throw new BadRequestException();
    }

    const artistsRepository = AppDataSource.getRepository('artist_entity');

    if(createAlbumDto.artistId) {
      const artist = await artistsRepository.findBy({
        id: createAlbumDto.artistId,
      });

      if(!artist.length) {
        throw new NotFoundException('Artist not found')
      }
    }

    const album = await this.albumRepository.create({
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
    });
    return await this.albumRepository.save(album);
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const album = await this.findOne(id);

    // const artist = await this.findArtist(updateAlbumDto.artistId);

    album.name = updateAlbumDto.name || album.name;
    album.year = updateAlbumDto.year || album.year;
    album.artistId = updateAlbumDto.artistId ? updateAlbumDto.artistId : album.artistId;

    return album;
  }

  async delete(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const album = await this.findOne(id);

    // const trackIndex = data.tracks.findIndex((track) => track.albumId === id);
    //
    // if (trackIndex >= 0) {
    //   data.tracks[trackIndex].albumId = null;
    // }
    // const favouriteAlbum = await this.favouriteService.findAlbum(id)
    // if (favouriteAlbum) {
    //   await this.favouriteService.deleteAlbumFromFav(id);
    // }

    const deleted = await this.albumRepository.remove(album);

    return { deleted: Boolean(deleted) };
  }
}
