import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as publicIp from "public-ip";
import { Repository } from "typeorm";
import {
  DEFAULT_MIMETYPE,
  SERVE_ROOT,
  UPLOAD_FOLDER,
} from "../../config/constants";
import { FileEntity } from "./entities/file.entity";
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async buildFilePath(file: Express.Multer.File) {
    const ipV4 = await publicIp.v4();
    // 静态资源根目录 + 上传文件目录 + 文件名。配置静态服务和上传路径相同，就能通过服务端 ip + 路径直接访问上传后的文件
    // http://193.123.254.139:3030/static/uploads/DK7ERTWZQWJ4UMQ2VJS2LE-clk011c-1.9.5.pdf
    const mimeType = file.mimetype.split("/")[1];
    const filePath = `${UPLOAD_FOLDER}/${mimeType || DEFAULT_MIMETYPE}/${
      file.filename
    }`;
    //
    const res = await this.create({
      filePath,
      mimeType,
      fileSize: file.size,
      uploadTime: new Date(),
    });

    return {
      fullPath: `${ipV4}:${process.env.PORT}${SERVE_ROOT}${filePath}`,
      ...res,
    }; // filename 新名字，在 UploadModule 中配置。originalname 原文件名
  }

  async create(dto: FileEntity) {
    const newFile = new FileEntity();
    Object.assign(newFile, dto);
    const res = await this.fileRepository.save(newFile);
    return res;
  }
}
