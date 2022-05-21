// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { WinstonModule } from "nest-winston";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./utils/validation.pipe";
import { ErrorFilter } from "./utils/error.filter";
import { loggerOption } from "./config/logger";
import { TransformInterceptor } from "./utils/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger(loggerOption),
  });
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  const options = new DocumentBuilder()
    .setTitle("NestJs RealWorld Example App")
    .setDescription("The RealWorld API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);
  await app.listen(process.env.PORT);
  console.log(
    `Application is running on: ${await app.getUrl()}/${
      process.env.API_PREFIX
    } NODE_ENV = ${process.env.NODE_ENV}`,
  );
}
bootstrap();
