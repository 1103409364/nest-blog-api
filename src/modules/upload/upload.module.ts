import { Module } from "@nestjs/common";
import { join } from "path";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as nuid from "nuid";
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, "../../../", "public", "uploads"),
        filename(req, file, cb) {
          // 自定义文件名称
          const filename = `${nuid.next()}.${file.originalname.split(".")[1]}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
