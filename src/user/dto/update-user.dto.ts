import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsBoolean()
  isActive: boolean;
}
