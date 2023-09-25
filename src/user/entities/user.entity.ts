import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  phone: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @ApiProperty()
  authenticated: boolean;

  @ApiProperty()
  skills: string[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  authenticated_at: Date;
}
