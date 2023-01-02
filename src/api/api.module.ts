import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ShortPostModule } from './short_post/short_post.module';

@Module({
  imports: [UserModule, ShortPostModule],
})
export class ApiModule {}
