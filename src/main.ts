import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Weather Apis')
    .setDescription('backend apis')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  await app.listen(port, () => {
    console.log(`backend server started on ${port}`);
  });
}
bootstrap();

// curl for historical data
// curl --location 'https://api.weatherapi.com/v1/history.json?key=57121365d88f4dcc87b92107240805&q=Paris&dt=2024-05-03&end_dt=2024-05-10'
