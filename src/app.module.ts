import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { ArticleModule } from "./modules/article/article.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { TagModule } from "./modules/tag/tag.module";
import ormConfig from "./config/orm.config";
import { FileModule } from "./modules/file/file.module";
import { StatusMonitorModule } from "nestjs-status-monitor";
import { statusMonitorOption } from "./config/statusMonitor";
import { serveStaticOption } from "./config/serveStatic";
// import { TasksModule } from "./modules/tasks/task.module";
import { OcrModule } from "./modules/ocr/ocr.module";
import { TranslateModule } from "./modules/translate/translate.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }), // 配置文件
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }), // 数据库
    ServeStaticModule.forRoot(serveStaticOption), // 静态文件
    StatusMonitorModule.forRoot(statusMonitorOption), // 监控
    // ScheduleModule.forRoot(),
    // TasksModule,
    UserModule,
    ArticleModule,
    ProfileModule,
    TagModule,
    FileModule,
    OcrModule,
    TranslateModule,
  ],
  controllers: [AppController], // 全局控制器
  providers: [AppService, Logger], // 全局注入 Logger
})
export class AppModule {}
