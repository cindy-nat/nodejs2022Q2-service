import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  // @ManyToOne(() => (ArtistEntity) => ArtistEntity.id)
  @Column()
  artistId: string | null;

  // @ManyToOne(() => (AlbumEntity) => AlbumEntity.id)
  @Column()
  albumId: string | null; // integer number, increments on update

  @Column()
  duration: number;
}
