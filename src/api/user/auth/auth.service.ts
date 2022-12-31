import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  constructor(private dataSource: DataSource) {}

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { email, password, username, name }: RegisterDto = body;
    let user: User = await this.dataSource
      .getRepository(User)
      .createQueryBuilder()
      .where('user.email = :email', { email: email })
      .orWhere('user.username = :username', { username: username })
      .getOne();

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.username = username;
    user.name = name;

    return await this.userRepository.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user = await this.userRepository.findOneBy({ email: email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = this.helper.isPasswordValid(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Password is incorrect', HttpStatus.NOT_FOUND);
    }

    return this.helper.generateToken(user);
  }

  public async refreshToken(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }
}
