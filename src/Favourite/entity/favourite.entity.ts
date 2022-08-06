import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../Artist/entity/artist.entity';
import { AlbumEntity } from '../../Album/entity/album.entity';
import { TrackEntity } from '../../Track/entity/track.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class FavouriteEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: number;

  @ManyToMany(() => ArtistEntity, (ArtistEntity) => ArtistEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinTable()
  artists: Array<ArtistEntity>;

  @ManyToMany(() => AlbumEntity, (AlbumEntity) => AlbumEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinTable()
  albums: Array<AlbumEntity>; // integer number, increments on update

  @ManyToMany(() => TrackEntity, (TrackEntity) => TrackEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinTable()
  tracks: Array<TrackEntity>;
}
