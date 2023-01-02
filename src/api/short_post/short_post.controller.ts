import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { ShortPost } from './entities/short_post.entity';
import { ShortPostLikeRelationship } from './entities/short_post_like_relationship.entity';
import { ShortPostShareRelationship } from './entities/short_post_share_relationship.entity';
import {
  CreateShortPostDto,
  EditShortPostDto,
  LikeShareShortPostDto,
} from './short_post.dto';
import { ShortPostService } from './short_post.service';

@Controller('short-post')
export class ShortPostController {
  @Inject(ShortPostService)
  private readonly shortPostService: ShortPostService;

  @Post('')
  @UseGuards(JwtAuthGuard)
  async createShortPost(
    @Body() body: CreateShortPostDto,
    @Req() req: Request,
  ): Promise<ShortPost> {
    return await this.shortPostService.createShortPost(body, req);
  }

  @Put('')
  @UseGuards(JwtAuthGuard)
  async editShortPost(
    @Body() body: EditShortPostDto,
    @Req() req: Request,
  ): Promise<ShortPost> {
    return await this.shortPostService.editShortPost(body, req);
  }

  @Post('like')
  @UseGuards(JwtAuthGuard)
  async likeShortPost(
    @Body() body: LikeShareShortPostDto,
    @Req() req: Request,
  ): Promise<ShortPostLikeRelationship> {
    return await this.shortPostService.likeShortPost(body, req);
  }

  @Post('share')
  @UseGuards(JwtAuthGuard)
  async shareShortPost(
    @Body() body: LikeShareShortPostDto,
    @Req() req: Request,
  ): Promise<ShortPostShareRelationship> {
    return await this.shortPostService.shareShortPost(body, req);
  }

  @Delete('/:short_post_id')
  @UseGuards(JwtAuthGuard)
  async deleteShortPost(
    @Param('short_post_id') short_post_id: number,
    @Req() req: Request,
  ): Promise<boolean> {
    return await this.shortPostService.deleteShortPost(short_post_id, req);
  }

  @Get('/:short_post_id')
  async getDetailShortPost(
    @Param('short_post_id') short_post_id: number,
  ): Promise<ShortPost> {
    return await this.shortPostService.showDetailShortPost(short_post_id);
  }
}
