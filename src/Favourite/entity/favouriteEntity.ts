import { Column, Entity, ManyToOne } from 'typeorm';
import { ArtistEntity } from '../../Artist/entity/artist.entity';
import { AlbumEntity } from '../../Album/entity/album.entity';
import { TrackEntity } from '../../Track/entity/track.entity';

@Entity()
export class FavouriteEntity {
  @ManyToOne(() => ArtistEntity, (ArtistEntity) => ArtistEntity.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Column()
  artistIds: (string | null)[];

  @ManyToOne(() => AlbumEntity, (AlbumEntity) => AlbumEntity.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Column()
  albumIds: (string | null)[]; // integer number, increments on update

  @ManyToOne(() => TrackEntity, (TrackEntity) => TrackEntity.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Column()
  trackIds: (string | null)[]; // integer number, increments on update
}
