import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../Artist/entity/artist.entity';
import { AlbumEntity } from '../../Album/entity/album.entity';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'text' })
  name: string;

  @ManyToOne(() => ArtistEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => AlbumEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Column({ nullable: true })
  albumId: string | null; // integer number, increments on update

  @Column()
  duration: number;
}
