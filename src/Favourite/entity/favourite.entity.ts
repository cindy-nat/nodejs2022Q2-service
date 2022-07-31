import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../Artist/entity/artist.entity';
import { AlbumEntity } from '../../Album/entity/album.entity';
import { TrackEntity } from '../../Track/entity/track.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class FavouriteEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: number;

  @ManyToOne(() => ArtistEntity, (ArtistEntity) => ArtistEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: true,
  })
  @Column('text', { nullable: true, array: true, default: [] })
  artistIds: (string | null)[];

  @ManyToOne(() => AlbumEntity, (AlbumEntity) => AlbumEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: true,
  })
  @Column('text', { nullable: true, array: true, default: [] })
  albumIds: (string | null)[]; // integer number, increments on update

  @ManyToOne(() => TrackEntity, (TrackEntity) => TrackEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: true,
  })
  @Column('text', { nullable: true, array: true, default: [] })
  trackIds: (string | null)[]; // integer number, increments on update
}
