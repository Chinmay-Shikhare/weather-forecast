import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { LocationEnum } from './enum/location.enum';
import { Logger } from '@nestjs/common';

@Injectable()
export class OpenWeatherApiService {
  private readonly apiKey: string;
  private readonly apiEndpoint: string;

  constructor() {
    this.apiKey = process.env.OPEN_WEATHER_API_KEY;
    this.apiEndpoint = process.env.OPEN_WEATHER_API_ENDPOINT;
  }

  async getLocationData(location: LocationEnum) {
    const apiKey = this.apiKey;
    const url = `${this.apiEndpoint}?q=${location}&APPID=${apiKey}`;

    Logger.log(url);
    try {
      const weatherData = await axios.get(url);
      return weatherData.data;
    } catch (e) {
      throw new BadRequestException(
        `Error in Open Weather External Api - ${e.response.data.message}`,
      );
    }
  }
}
