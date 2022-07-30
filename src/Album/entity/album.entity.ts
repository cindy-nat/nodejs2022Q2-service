import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from "../../Artist/entity/artist.entity";

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (ArtistEntity) => ArtistEntity.id,
    {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Column()
  artistId: string | null;
}
