import { Trim } from 'class-sanitizer';
import { IsEmail } from 'class-validator';
import {
  IsString,
  MinLength,
} from 'class-validator/types/decorator/decorators';

export class RegisterDto {
  @Trim()
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @IsString()
  username: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
