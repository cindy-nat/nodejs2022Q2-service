import { User } from './user';
import { Artist } from './Artist';
import { AlbumSchema } from './Album';
import { TrackSchema } from './Track';

export const data: {
  users: User[];
  artists: Artist[];
  albums: AlbumSchema[];
  tracks: TrackSchema[];
} = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
};
