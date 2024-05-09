import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Logger } from '@nestjs/common';
import { GetHistoryDataDto } from 'src/weather/dto/get-history.dto';

@Injectable()
export class WeatherApiService {
  private readonly apiKey: string;
  private readonly apiEndpoint: string;

  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.apiEndpoint = process.env.WEATHER_API_HISTORY_ENDPOINT;
  }

  async getHistoryData(getHistoryDataDto: GetHistoryDataDto) {
    const apiKey = this.apiKey;
    const { locationName, startDate, endDate } = getHistoryDataDto;

    const url = `${this.apiEndpoint}?key=${this.apiKey}&q=${locationName}&dt=${startDate}&end_dt=${endDate}`;

    Logger.log(url);

    try {
      const weatherData = await axios.get(url);

      const {
        location: { name, country, lat, lon },
        forecast: { forecastday },
      } = weatherData.data;

      const arr = [];

      forecastday.map((e: any) => {
        arr.push({
          date: e.date,
          maxTemp: e.day.maxtemp_c,
          minTemp: e.day.mintemp_c,
          windSpeed: e.hour[0].wind_mph,
          humidity: e.hour[0].humidity,
        });
      });

      const responseObject = {
        name,
        country,
        latitude: lat,
        longitude: lon,
        historyData: arr,
      };

      return responseObject;
    } catch (e) {
      throw new BadRequestException(`Error in Weather External Api`);
    }
  }
}
