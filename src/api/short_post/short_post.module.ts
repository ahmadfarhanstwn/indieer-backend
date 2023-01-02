import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortPost } from './entities/short_post.entity';
import { ShortPostLikeRelationship } from './entities/short_post_like_relationship.entity';
import { ShortPostShareRelationship } from './entities/short_post_share_relationship.entity';
import { ShortPostService } from './short_post.service';
import { ShortPostController } from './short_post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShortPost,
      ShortPostLikeRelationship,
      ShortPostShareRelationship,
    ]),
  ],
  providers: [ShortPostService],
  controllers: [ShortPostController],
})
export class ShortPostModule {}
