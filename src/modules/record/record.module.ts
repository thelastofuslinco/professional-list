import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RecordController],
  providers: [UserService, PrismaService],
})
export class RecordModule {}
