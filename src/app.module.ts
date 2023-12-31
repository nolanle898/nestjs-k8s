import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConsumer } from './app.consumer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import app from './config/app';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        prefix: 'bbachain',
        redis: {
          port: +configService.get('redis.port'),
          host: configService.get('redis.host'),
          password: configService.get('redis.pass'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'app',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app],
    }),
  ],
  controllers: [AppController],
  providers: [AppConsumer, AppService],
})
export class AppModule {}
