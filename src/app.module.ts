import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RecordModule } from './modules/record/record.module';

@Module({
  imports: [UserModule, RecordModule],
})
export class AppModule {}
