import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAuthGuard } from '@nestjs/passport/dist';
import { User } from '../user.entity';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, user: User): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: Request = context.switchToHttp().getRequest();

    return user ? true : false;
  }
}
