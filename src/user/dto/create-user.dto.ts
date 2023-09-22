import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  authenticated?: Date;

  @ApiProperty()
  skills: string[];
}
