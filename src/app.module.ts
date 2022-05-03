import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { join } from "path";
import { UserModule } from "./modules/user/user.module";
import { ArticleModule } from "./modules/article/article.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { TagModule } from "./modules/tag/tag.module";
import { configuration } from "./config/configuration";
import { UploadModule } from "./modules/upload/upload.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("database"),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/static",
    }),
    UserModule,
    ArticleModule,
    ProfileModule,
    TagModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
