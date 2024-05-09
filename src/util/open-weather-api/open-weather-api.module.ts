import { Module } from '@nestjs/common';
import { OpenWeatherApiService } from './open-weather-api.service';

@Module({
  providers: [OpenWeatherApiService],
  exports: [OpenWeatherApiService],
})
export class OpenWeatherApiModule {}
