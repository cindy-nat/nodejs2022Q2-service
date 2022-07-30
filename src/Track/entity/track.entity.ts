import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from "../../Artist/entity/artist.entity";
import { AlbumEntity } from "../../Album/entity/album.entity";

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @ManyToOne(() => ArtistEntity, (ArtistEntity) => ArtistEntity.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Column()
  artistId: string | null;

  @ManyToOne(() => AlbumEntity, (AlbumEntity) => AlbumEntity.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Column()
  albumId: string | null; // integer number, increments on update

  @Column()
  duration: number;
}
