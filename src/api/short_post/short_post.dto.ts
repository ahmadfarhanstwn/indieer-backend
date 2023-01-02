import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateShortPostDto {
  @IsString()
  @MaxLength(300)
  content: string;

  @IsNumber()
  @IsOptional()
  reply_to_short_post_id: number;
}

export class EditShortPostDto {
  @IsNumber()
  short_post_id: number;

  @IsString()
  @MaxLength(300)
  content: string;
}

export class LikeShareShortPostDto {
  @IsNumber()
  like_short_post_id: number;
}
