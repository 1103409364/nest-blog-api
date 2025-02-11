import * as nuid from "nuid";
import { Module } from "@nestjs/common";
import { join } from "path";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer"; // 需要安装 multer。否则使用幽灵依赖会报错：Cannot find module 'multer'
import {
  DEFAULT_MIMETYPE,
  STATIC_PATH,
  UPLOAD_FOLDER,
} from "@/config/constants";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { mkdirIfNotExists } from "@/utils/tools";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "./entities/file.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.register({
      // memoryStorage TODO: 能否动态控制上传到内存还是磁盘，或者第三方存储
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
          file.originalname = decodeURIComponent(escape(file.originalname));
          cb(null, `${nuid.next()}-${file.originalname}`); // 自定义文件名称
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
