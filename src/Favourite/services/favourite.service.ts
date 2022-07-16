import {
  BadRequestException,
  Injectable, NotFoundException,
  UnprocessableEntityException
} from "@nestjs/common";
import { FavouriteSchema } from '../schemas/favourite.schema';
import { data } from '../../data';
import { TrackSchema } from '../../Track';
import { validate } from 'uuid';
import { AlbumSchema } from '../../Album';
import { Artist } from '../../Artist';
import { DeleteType } from "../../general.schema";

@Injectable()
export class FavouriteService {
  async findAll(): Promise<FavouriteSchema> {
    const result = {
      artists: [],
      albums: [],
      tracks: [],
    };

    data.favourites.artists.forEach((favArtist) => {
      result.artists.push(
        data.artists.find((artist) => artist.id === favArtist),
      );
    });

    data.favourites.albums.forEach((favAlbum) => {
      result.albums.push(data.albums.find((album) => album.id === favAlbum));
    });

    data.favourites.tracks.forEach((favTrack) => {
      result.tracks.push(data.tracks.find((track) => track.id === favTrack));
    });

    return result;
  }

  async addTrackToFav(id: string): Promise<TrackSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const track = data.tracks.find((track) => track.id === id);

    if (!track) {
      throw new UnprocessableEntityException();
    }

    data.favourites.tracks.push(id);

    return track;
  }

  async addAlbumToFav(id: string): Promise<AlbumSchema> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const album = data.albums.find((album) => album.id === id);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    data.favourites.albums.push(id);

    return album;
  }

  async addArtistToFav(id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const artist = data.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    data.favourites.artists.push(id);

    return artist;
  }

  async deleteTrackFromFav(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const favTrack = data.favourites.tracks.find((trackId) => trackId === id);

    if (!favTrack) {
      throw new NotFoundException();
    }

    data.favourites.tracks = data.favourites.tracks.filter(
      (trackId) => trackId !== id,
    );

    return { deleted: true };
  }

  async deleteAlbumFromFav(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const favAlbum = data.favourites.albums.find((albumId) => albumId === id);

    if (!favAlbum) {
      throw new NotFoundException();
    }

    data.favourites.albums = data.favourites.albums.filter(
      (albumId) => albumId !== id,
    );

    return { deleted: true };
  }

  async deleteArtistFromFav(id: string): Promise<DeleteType> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const favArtist = data.favourites.artists.find((artistId) => artistId === id);

    if (!favArtist) {
      throw new NotFoundException();
    }

    data.favourites.artists = data.favourites.artists.filter(
      (artistId) => artistId !== id,
    );

    return { deleted: true };
  }
}
