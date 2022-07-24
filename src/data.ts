import { User } from './user';
import { Artist } from './Artist';
import { AlbumSchema } from './Album';
import { TrackSchema } from './Track';
import { FavouriteSchema } from './Favourite';

export const data: {
  users: User[];
  artists: Artist[];
  albums: AlbumSchema[];
  tracks: TrackSchema[];
  favourites: FavouriteSchema;
} = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favourites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};
