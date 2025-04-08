import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import configuration from './config/configuration';
import { HomeModule } from './modules/home/home.module';
import { AppGateway } from './app.gateway';
import { JwtModule } from '@nestjs/jwt';
import { GameLine98Module } from './modules/game-line98/game-line98.module';
import { GameCaroModule } from './modules/game-caro/game-caro.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { expiresIn:  configService.get<string>('jwtExpiresIn') },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    HomeModule,
    GameLine98Module,
    GameCaroModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
