import { Module } from "@nestjs/common";
import { join } from "path";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as nuid from "nuid";
import { ROOT, UPLOAD_FOLDER } from "@/config/constants";
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, "../../../", ROOT, UPLOAD_FOLDER), // 上传到 /root/workspace/realworld-nestjs8-mysql/dist/modules/upload/static
        filename(req, file, cb) {
          cb(null, `${nuid.next()}-${file.originalname}`); // 自定义文件名称
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
