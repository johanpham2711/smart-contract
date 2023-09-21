import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (app: NestExpressApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Music genius API')
    .setDescription('This is the Music genius API documentation!')
    .setVersion('1.0')
    .addTag('wallets')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
