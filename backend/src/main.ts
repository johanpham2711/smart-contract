import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import {
  ENVIRONMENT,
  ENVS_ALLOW_DOCS,
  SERVER_PORT,
  URL_PREFIX,
} from './constants';
import { swaggerConfig } from './docs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(morgan('dev'));

  // global nest setup
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Starts listening to shutdown hooks
  app.enableShutdownHooks();

  // config
  app.setGlobalPrefix(URL_PREFIX);

  // swagger
  ENVS_ALLOW_DOCS.includes(ENVIRONMENT) && swaggerConfig(app);

  await app.listen(SERVER_PORT);
  console.log(`Application is running on ${SERVER_PORT}`);
}
bootstrap();
