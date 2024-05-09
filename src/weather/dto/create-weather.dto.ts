import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { LocationEnum } from 'src/util/open-weather-api/enum/location.enum';

export class CreateWeatherDto {
  @ApiProperty()
  @IsString()
  @IsEnum(LocationEnum)
  locationName: LocationEnum;
}
