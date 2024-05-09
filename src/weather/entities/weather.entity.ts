import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Weather extends Document {
  @Prop({ required: true })
  weatherId: string;

  @Prop({ required: true })
  locationName: string;

  @Prop({ required: true })
  latitude: string;

  @Prop({ required: true })
  longitude: string;

  @Prop({ required: true })
  temperature: string;

  @Prop({ required: true })
  humidity: string;

  @Prop({ required: true })
  windSpeed: string;

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
