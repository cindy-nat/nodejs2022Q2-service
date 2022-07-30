import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  // @ManyToOne(() => (ArtistEntity) => ArtistEntity.id)
  @Column()
  artistId: string | null;
}
