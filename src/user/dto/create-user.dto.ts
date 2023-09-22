import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize,
  Length,
  IsEmail,
  IsDate,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(14, 14)
  @ApiProperty()
  cpf: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  phone?: string;

  @IsString()
  @Length(8)
  @ApiProperty()
  password: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  authenticated?: Date;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ApiProperty()
  skills: string[];
}