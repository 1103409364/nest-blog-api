import * as nuid from "nuid";
import { Module } from "@nestjs/common";
import { join } from "path";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import {
  DEFAULT_MIMETYPE,
  STATIC_PATH,
  UPLOAD_FOLDER,
} from "@/config/constants";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { mkdirIfNotExists } from "@/utils/tools";
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          // const basePath = join(__dirname, "../../../", ROOT, UPLOAD_FOLDER); // 上传到 /root/workspace/realworld-nestjs8-mysql/dist/modules/upload/static
          // 根据上传的文件类型将文件分别存到对应文件夹
          const mimeType = file.mimetype.split("/")[1];
          const filePath = join(
            STATIC_PATH,
            UPLOAD_FOLDER,
            mimeType || DEFAULT_MIMETYPE,
          );
          mkdirIfNotExists(filePath);
          return cb(null, filePath);
        },
        filename(req, file, cb) {
          cb(null, `${nuid.next()}-${file.originalname}`); // 自定义文件名称
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
