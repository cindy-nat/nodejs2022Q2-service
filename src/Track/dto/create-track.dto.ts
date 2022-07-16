import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string; // refers to Artist

  @IsOptional()
  @IsString()
  albumId: string; // refers to Album

  @IsOptional()
  @IsNumber()
  duration: number; // integer number
}
