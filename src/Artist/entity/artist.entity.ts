import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationOptions } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AlbumEntity } from '../../Album/entity/album.entity';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
