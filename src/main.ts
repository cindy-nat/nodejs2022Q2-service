import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { MyLogger } from './logger/logger.service';
import { HttpExceptionFilter } from './http-exception.filter';
import getLogLevels from './getLogLevels';

dotenv.config();

const PORT = process.env.PORT || 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: getLogLevels(process.env.NODE_ENV === 'production'),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(MyLogger));
  app.useGlobalFilters(new HttpExceptionFilter());

  console.log('Port running on: ', PORT);

  const loggingService = new MyLogger();

  process
    .on('unhandledRejection', (reason, p) => {
      console.error(reason, 'Unhandled Rejection at Promise', p);
      loggingService.error(`'Unhandled Rejection at Promise' ${reason}`);
    })
    .on('uncaughtException', (error) => {
      console.error(error, 'Uncaught Exception thrown');
      loggingService.error(`'Uncaught Exception thrown' ${error}`);
      process.exit(1);
    });

  await app.listen(PORT);
}
bootstrap();
