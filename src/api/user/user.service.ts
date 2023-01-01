import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { changeProfileDto } from './user.dto';
import { User } from './user.entity';

export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async changeProfile(
    body: changeProfileDto,
    req: Request,
  ): Promise<User> {
    const user: User = <User>req.user;

    const isUsernameExist: User = await this.userRepository.findOneBy({
      username: body.username,
    });

    if (body.username !== user.username && isUsernameExist) {
      throw new HttpException(
        'Username is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.username = body.username;
    user.bio = body.bio;
    user.name = body.name;
    user.profile_picture = body.profile_picture;

    return await this.userRepository.save(user);
  }
}
