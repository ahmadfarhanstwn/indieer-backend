import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
        secret: config.get('JWT_KEY'),
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy],
})
export class AuthModule {}
