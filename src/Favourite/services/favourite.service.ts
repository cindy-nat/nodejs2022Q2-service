// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
//   UnprocessableEntityException,
// } from '@nestjs/common';
// import { FavouriteSchema } from '../schemas/favourite.schema';
// import { validate } from 'uuid';
// import { Artist } from '../../Artist';
// import { DeleteType } from '../../general.schema';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ArtistEntity } from '../../Artist/entity/artist.entity';
// import { Repository } from 'typeorm';
// import { FavouriteEntity } from '../entity/favouriteEntity';
// import { AlbumEntity } from '../../Album/entity/album.entity';
// import { TrackEntity } from '../../Track/entity/track.entity';
//
// @Injectable()
// export class FavouriteService {
//   constructor(
//     @InjectRepository(AlbumEntity)
//     private albums: Repository<AlbumEntity>,
//     @InjectRepository(ArtistEntity)
//     private artists: Repository<ArtistEntity>,
//     @InjectRepository(TrackEntity)
//     private tracks: Repository<TrackEntity>,
//     @InjectRepository(FavouriteEntity)
//     private favouriteRepository: Repository<FavouriteEntity>
//
//   ) {}
//
//   async findAll(): Promise<FavouriteSchema> {
//     const result = {
//       artists: [],
//       albums: [],
//       tracks: [],
//     };
//     const data = await this.favouriteRepository.find();
//     for (const artist of data[0].artistIds) {
//       const artistData = await this.artists.findBy({ id: artist });
//       result.artists.push(artistData);
//     }
//
//     return result
//   }
//
//   async addTrackToFav(id: string): Promise<TrackEntity> {
//     if (!validate(id)) {
//       throw new BadRequestException();
//     }
//
//     const track = await this.tracks.findOneBy({ id: id });
//
//     if (!track) {
//       throw new UnprocessableEntityException();
//     }
//
//     const data = await this.favouriteRepository.find();
//
//     data[0].trackIds = [...data[0].trackIds, id];
//
//     return track;
//   }
//
//   async addAlbumToFav(id: string): Promise<AlbumEntity> {
//     if (!validate(id)) {
//       throw new BadRequestException();
//     }
//
//     const album = await this.albums.findOneBy({ id: id });
//
//     if (!album) {
//       throw new UnprocessableEntityException();
//     }
//
//     const data = await this.favouriteRepository.find();
//     data[0].albumIds = [...data[0].albumIds, id];
//
//     return album;
//   }
//
//   async addArtistToFav(id: string): Promise<Artist> {
//     if (!validate(id)) {
//       throw new BadRequestException();
//     }
//
//     const artist = this.artists.findOneBy({ id: id });
//
//     if (!artist) {
//       throw new UnprocessableEntityException();
//     }
//
//     const data = await this.favouriteRepository.find();
//     data[0].artistIds = [...data[0].artistIds, id];
//
//     return artist;
//   }
//
//   async deleteTrackFromFav(id: string): Promise<DeleteType> {
//     if (!validate(id)) {
//       throw new BadRequestException();
//     }
//
//     const data = await this.favouriteRepository.find();
//     const favTrack = data[0].trackIds.find((track) => track === id);
//
//     if (!favTrack) {
//       throw new NotFoundException();
//     }
//
//     data[0].trackIds = data[0].trackIds.filter((track) => track !== id)
//
//     return { deleted: true };
//   }
//
//   async deleteAlbumFromFav(id: string): Promise<DeleteType> {
//     if (!validate(id)) {
//       throw new BadRequestException();
//     }
//
//     const data = await this.favouriteRepository.find();
//     const favAlbum = data[0].albumIds.find((album) => album === id);
//
//     if (!favAlbum) {
//       throw new NotFoundException();
//     }
//
//     data[0].albumIds = data[0].albumIds.filter((album) => album !== id)
//
//     return { deleted: true };
//   }
//
//   async deleteArtistFromFav(id: string): Promise<DeleteType> {
//     if (!validate(id)) {
//       throw new BadRequestException();
//     }
//
//     const data = await this.favouriteRepository.find();
//     const favArtist = data[0].artistIds.find((artist) => artist === id);
//
//     if (!favArtist) {
//       throw new NotFoundException();
//     }
//
//     data[0].artistIds = data[0].artistIds.filter((artist) => artist !== id)
//
//     return { deleted: true };
//   }
// }
