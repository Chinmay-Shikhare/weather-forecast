import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { LocationEnum } from 'src/util/open-weather-api/enum/location.enum';

export class GetHistoryDataDto {
  @ApiProperty()
  @IsString()
  @IsEnum(LocationEnum)
  locationName: LocationEnum;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  endDate: string;
}
