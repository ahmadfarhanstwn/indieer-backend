import { Trim } from 'class-sanitizer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @MaxLength(30)
  @IsString()
  username: string;

  @IsString()
  name: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
