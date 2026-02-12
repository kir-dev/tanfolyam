import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { apiReference } from '@scalar/nestjs-api-reference';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Ticketing API 2025')
    .setVersion('1.0')
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(
    '/scalar',
    apiReference({
      content: documentFactory,
    }),
  );

  const port = process.env.PORT ?? 3000;
  console.log(`Nestjs is running on port ${port}`);
  await app.listen(port);
}

void bootstrap();
