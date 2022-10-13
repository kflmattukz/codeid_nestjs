import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsEmail()
  userEmail: string;

  @IsString()
  @Length(3, 25, { message: 'Password must be at least 3 and max 25 length' })
  userPassword: string;
}
