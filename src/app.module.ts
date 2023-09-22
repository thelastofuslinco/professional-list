import { Module } from '@nestjs/common';
import { RecordModule } from './record/record.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, RecordModule, PrismaModule],
})
export class AppModule {}
