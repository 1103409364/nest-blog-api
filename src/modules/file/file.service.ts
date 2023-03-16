import { Injectable } from "@nestjs/common";
import { SERVE_ROOT, UPLOAD_FOLDER } from "../../config/constants";
@Injectable()
export class FileService {
  buildFilePath(file: Express.Multer.File) {
    // 静态资源根目录 + 上传文件目录 + 文件名。配置静态服务和上传路径相同，就能通过服务端 ip + 路径直接访问上传后的文件
    // http://193.123.254.139:3030/static/uploads/DK7ERTWZQWJ4UMQ2VJS2LE-clk011c-1.9.5.pdf
    return `${SERVE_ROOT}${UPLOAD_FOLDER}/${file.filename}`; // filename 新名字，在 UploadModule 中配置。originalname 原文件名
  }
}
