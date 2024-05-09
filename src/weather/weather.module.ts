import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Weather, WeatherSchema } from './entities/weather.entity';
import { OpenWeatherApiModule } from 'src/util/open-weather-api/open-weather-api.module';
import { CacheServiceModule } from 'src/util/cache-service/cache-service.module';
import { WeatherApiModule } from 'src/util/weather-api/weather-api.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
    OpenWeatherApiModule,
    CacheServiceModule,
    WeatherApiModule,
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
