import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  year: number | null;

  @IsOptional()
  @IsString()
  artistId: string;
}
