import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
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

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false, nullable: true })
  authenticated: Date | null;

  @ApiProperty()
  skills: string[];

  @ApiProperty()
  created_at: Date;
}
