import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string; // refers to Artist

  @IsOptional()
  @IsString()
  albumId: string; // refers to Album

  @IsOptional()
  @IsInt()
  duration: number; // integer number
}
