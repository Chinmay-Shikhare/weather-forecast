import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateWeatherDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  weatherId: string;

  @ApiProperty()
  @IsString()
  locationName: string;

  @ApiProperty()
  @IsString()
  latitude: string;

  @ApiProperty()
  @IsString()
  longitude: string;

  @ApiProperty()
  @IsString()
  temperature: string;

  @ApiProperty()
  @IsString()
  humidity: string;

  @ApiProperty()
  @IsString()
  windSpeed: string;
}
