// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './utils/validation.pipe';
import { ErrorFilter } from './utils/error.filter';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  const options = new DocumentBuilder()
    .setTitle('NestJs RealWorld Example App')
    .setDescription('The RealWorld API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT);
  console.log(
    `Application is running on: ${await app.getUrl()} NODE_ENV = ${
      process.env.NODE_ENV
    }`,
  );
}
bootstrap();
