import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RestModule } from './rest';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.getHttpAdapter().getInstance().set('json spaces', 2);

  const restOptions = new DocumentBuilder()
    .setTitle('REST Example')
    .setDescription('The sample REST API description')
    .setVersion('1.0')
    .build();
  const restDocument = SwaggerModule.createDocument(app, restOptions, {
    include: [RestModule],
  });
  SwaggerModule.setup('rest/doc', app, restDocument);

  const jsonApiOptions = new DocumentBuilder()
    .setTitle('JSON:API Example')
    .setDescription('The sample JSON:API description')
    .setVersion('1.0')
    .build();
  const jsonApiDocument = SwaggerModule.createDocument(app, jsonApiOptions, {});

  // workaround to filter for "jsonapi" routes
  const jsonApiPaths = {};
  const jsonApiSchemas = {};
  Object.keys(jsonApiDocument.paths).forEach((path) => {
    if (path.startsWith('/jsonapi')) {
      jsonApiPaths[path] = jsonApiDocument.paths[path];
    }
  });
  jsonApiDocument.paths = jsonApiPaths;
  Object.keys(jsonApiDocument.components?.schemas).forEach((schema) => {
    if (schema.endsWith('Dto') === false) {
      jsonApiSchemas[schema] = jsonApiDocument.components.schemas[schema];
    }
  });
  jsonApiDocument.components.schemas = jsonApiSchemas;

  SwaggerModule.setup('jsonapi/doc', app, jsonApiDocument);

  await app.listen(3000);
}
bootstrap();
