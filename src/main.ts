import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { MyLogger } from './logger/logger.service';

dotenv.config();

const PORT = process.env.PORT || 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(MyLogger));

  console.log('Port running on: ', PORT);

  await app.listen(PORT);
}
bootstrap();
