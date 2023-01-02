import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { ShortPost } from './entities/short_post.entity';
import { ShortPostLikeRelationship } from './entities/short_post_like_relationship.entity';
import { ShortPostShareRelationship } from './entities/short_post_share_relationship.entity';
import {
  CreateShortPostDto,
  EditShortPostDto,
  LikeShareShortPostDto,
} from './short_post.dto';

@Injectable()
export class ShortPostService {
  @InjectRepository(ShortPost)
  private readonly shortPostRepository: Repository<ShortPost>;

  @InjectRepository(ShortPostLikeRelationship)
  private readonly shortPostLikeRelationshipRepository: Repository<ShortPostLikeRelationship>;

  @InjectRepository(ShortPostShareRelationship)
  private readonly shortPostShareRelationshipRepository: Repository<ShortPostShareRelationship>;

  public async createShortPost(
    body: CreateShortPostDto,
    req: Request,
  ): Promise<ShortPost> {
    const user: User = <User>req.user;

    const short_post: ShortPost = new ShortPost();

    short_post.content = body.content;
    if (body.reply_to_short_post_id != null)
      short_post.reply_to_short_post_id = body.reply_to_short_post_id;
    short_post.user_id = user.id;

    return await this.shortPostRepository.save(short_post);
  }

  public async editShortPost(
    body: EditShortPostDto,
    req: Request,
  ): Promise<ShortPost> {
    const user: User = <User>req.user;

    const short_post: ShortPost = await this.shortPostRepository.findOneBy({
      id: body.short_post_id,
    });

    if (!short_post) {
      throw new HttpException("Can't found post", HttpStatus.NOT_FOUND);
    }

    if (user.id !== short_post.user_id) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    short_post.content = body.content;

    return await this.shortPostRepository.save(short_post);
  }

  public async likeShortPost(
    body: LikeShareShortPostDto,
    req: Request,
  ): Promise<ShortPostLikeRelationship> {
    const user: User = <User>req.user;

    const isAlreadyLiked: ShortPostLikeRelationship =
      await this.shortPostLikeRelationshipRepository.findOneBy({
        short_post_id: body.like_short_post_id,
        user_id: user.id,
      });

    if (isAlreadyLiked) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    const shortPostLikeRelationship = new ShortPostLikeRelationship();

    shortPostLikeRelationship.short_post_id = body.like_short_post_id;
    shortPostLikeRelationship.user_id = user.id;

    return await this.shortPostLikeRelationshipRepository.save(
      shortPostLikeRelationship,
    );
  }

  public async shareShortPost(
    body: LikeShareShortPostDto,
    req: Request,
  ): Promise<ShortPostShareRelationship> {
    const user: User = <User>req.user;

    const shortPostShareRelationship = new ShortPostShareRelationship();

    shortPostShareRelationship.short_post_id = body.like_short_post_id;
    shortPostShareRelationship.user_id = user.id;

    return await this.shortPostShareRelationshipRepository.save(
      shortPostShareRelationship,
    );
  }

  public async deleteShortPost(
    deleted_short_post_id: number,
    req: Request,
  ): Promise<boolean> {
    const user: User = <User>req.user;

    const shortPost: ShortPost = await this.shortPostRepository.findOneBy({
      id: deleted_short_post_id,
    });

    if (shortPost.user_id !== user.id) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    await this.shortPostRepository.delete(shortPost);

    return true;
  }

  public async showDetailShortPost(short_post_id: number): Promise<ShortPost> {
    return await this.shortPostRepository.findOneBy({ id: short_post_id });
  }

  // view all posts
}
