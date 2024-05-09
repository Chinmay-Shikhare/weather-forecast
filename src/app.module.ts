import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from './weather/weather.module';
import { OpenWeatherApiModule } from './util/open-weather-api/open-weather-api.module';
import { ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CacheServiceModule } from './util/cache-service/cache-service.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MorganMiddleware } from './util/middlewares/morgan.middleware';
import { WeatherApiModule } from './util/weather-api/weather-api.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/weather'),
    WeatherModule,
    OpenWeatherApiModule,
    CacheServiceModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // only 100 request allowed in 6 seconds
        limit: 100,
      },
    ]),
    WeatherApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
