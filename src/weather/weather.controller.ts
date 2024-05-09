import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetHistoryDataDto } from './dto/get-history.dto';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiTags('Save Location')
  @Post('locations')
  @UsePipes(new ValidationPipe())
  saveLocation(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.saveLocation(createWeatherDto);
  }

  @ApiTags('Get All Locations')
  @Get('locations')
  getAllWeatherDetails() {
    return this.weatherService.getAllWeatherData();
  }

  @ApiTags('Get History Data')
  @Get('history')
  getHistorydata(@Query() queryParams: GetHistoryDataDto) {
    const { locationName, startDate, endDate } = queryParams;
    return this.weatherService.getHistoryData({
      locationName,
      startDate,
      endDate,
    });
  }

  @ApiTags('Get Location by id')
  @Get('locations/:locationId')
  getWeatherDetailsByLocation(@Param('locationId') locationId: string) {
    return this.weatherService.getWeatherDataById(locationId);
  }

  @ApiTags('Update Location')
  @Patch('locations/:locationId')
  @UsePipes(new ValidationPipe())
  updateWeatherDetails(
    @Param('locationId') locationId: string,
    @Body() updateWeatherDto: UpdateWeatherDto,
  ) {
    return this.weatherService.updateWeatherData({
      weatherId: locationId,
      ...updateWeatherDto,
    });
  }

  @ApiTags('Delete')
  @Delete('locations/:locationId')
  deleteWeatherById(@Param('locationId') locationId: string) {
    return this.weatherService.deleteWeatherDataById(locationId);
  }
}
