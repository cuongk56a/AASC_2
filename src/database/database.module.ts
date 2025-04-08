import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import configuration from '../config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'), // Lấy uri MongoDB từ cấu hình
      }),
      inject: [ConfigService], // Inject ConfigService vào MongooseModule
    }),
  ],
})
export class DatabaseModule {}
