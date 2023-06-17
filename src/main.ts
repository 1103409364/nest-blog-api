import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { WinstonModule } from "nest-winston";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./utils/validation.pipe"; // nestjs 自带了 ValidationPipe import { ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from "./utils/error.filter";
import { loggerOption } from "./config/logger";
import { TransformInterceptor } from "./utils/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger(loggerOption), // 使用 winston 日志
  });
  app.setGlobalPrefix(process.env.API_PREFIX); // 全局前缀
  app.useGlobalPipes(new ValidationPipe()); // 全局验证管道
  app.useGlobalFilters(new ErrorFilter()); // 全局错误过滤器
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局拦截器
  const options = new DocumentBuilder()
    .setTitle("NestJs RealWorld Example App")
    .setDescription("The RealWorld API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options); // 生成 api 文档
  // 访问 http://ip:3080/docs/ 查看 api 文档
  SwaggerModule.setup("docs", app, document); // 设置 api 文档路径
  await app.listen(process.env.PORT);
  console.log(
    `Application is running on: ${await app.getUrl()}/${
      process.env.API_PREFIX
    } NODE_ENV = ${process.env.NODE_ENV}`,
  );
}
bootstrap();
