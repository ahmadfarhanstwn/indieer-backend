import { IsOptional, IsString, MaxLength } from 'class-validator';

export class changeProfileDto {
  @IsString()
  @MaxLength(30)
  username: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profile_picture?: string;
}
