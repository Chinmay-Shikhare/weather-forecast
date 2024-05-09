import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Weather } from './entities/weather.entity';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OpenWeatherApiService } from 'src/util/open-weather-api/open-weather-api.service';
import { LocationEnum } from 'src/util/open-weather-api/enum/location.enum';
import { CacheService } from 'src/util/cache-service/cache-service.service';
import { GetHistoryDataDto } from './dto/get-history.dto';
import { WeatherApiService } from 'src/util/weather-api/weather-api.service';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private readonly weatherModel: Model<Weather>,
    private readonly openWeatherApirService: OpenWeatherApiService,
    private readonly cacheService: CacheService,
    private readonly weatherApiService: WeatherApiService,
  ) {}

  async saveLocation(createWeatherDto: CreateWeatherDto) {
    const weatherId = uuidv4();

    const { locationName } = createWeatherDto;

    const isAlreadyPresent =
      await this.checkLocationAlreadyPresent(locationName);

    if (isAlreadyPresent) {
      throw new BadRequestException('City Already present in database');
    }

    const weatherData =
      await this.openWeatherApirService.getLocationData(locationName);

    const {
      coord: { lon, lat },
      main: { temp, humidity },
      wind: { speed },
    } = weatherData;

    const requestData = {
      weatherId,
      locationName: createWeatherDto.locationName,
      latitude: lat,
      longitude: lon,
      temperature: temp,
      humidity: humidity,
      windSpeed: speed,
    };

    return this.weatherModel.create(requestData);
  }

  getAllWeatherData(): Promise<Weather[]> {
    return this.weatherModel.find();
  }

  async getHistoryData(getHistoryDataDto: GetHistoryDataDto) {
    return this.weatherApiService.getHistoryData(getHistoryDataDto);
  }

  async getWeatherDataById(weatherId: string) {
    const cachedData = this.cacheService.get<string>('cachedData');

    if (cachedData) {
      return cachedData;
    }

    const weatherData = await this.weatherModel.findOne({ weatherId });
    if (!weatherData) {
      throw new BadRequestException('Location Not found');
    }
    this.cacheService.set('cachedData', weatherData);
    return weatherData;
  }

  async getWeatherDataByLocation(location: string) {
    const weatherData = await this.weatherModel.findOne({
      locationName: location,
    });
    if (!weatherData) {
      throw new BadRequestException('Location Not found');
    }
    return weatherData;
  }

  async checkLocationAlreadyPresent(location: LocationEnum) {
    const weatherData = await this.weatherModel.findOne({
      locationName: location,
    });
    if (!weatherData) {
      return false;
    }
    return true;
  }

  async updateWeatherData(updateWeatherDto: UpdateWeatherDto) {
    const { weatherId } = updateWeatherDto;
    await this.getWeatherDataById(weatherId);
    return this.weatherModel.findOneAndUpdate({ weatherId }, updateWeatherDto, {
      new: true,
    });
  }

  async deleteWeatherDataById(weatherId: string) {
    await this.getWeatherDataById(weatherId);
    return this.weatherModel.findOneAndUpdate(
      { weatherId },
      { $set: { isActive: false } },
      { new: true },
    );
  }
}
