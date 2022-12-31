import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  private jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  public async validateUser(decoded: any): Promise<User> {
    return await this.userRepository.findOneBy({ id: decoded.id });
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }
}
