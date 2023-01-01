import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/auth.guard';
import { changeProfileDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Put('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async changeProfile(
    @Body() body: changeProfileDto,
    @Req() req: Request,
  ): Promise<User> {
    return await this.userService.changeProfile(body, req);
  }
}
