import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  DEFAULT_MIMETYPE,
  PREVIEW_FOLDER,
  SERVE_ROOT,
  STATIC_PATH,
  UPLOAD_FOLDER,
} from "../../config/constants";
import { FileEntity } from "./entities/file.entity";
// import * as publicIp from "public-ip";
import { promises as fs } from "fs";
import { join } from "path";
import { promisify } from "node:util";
import * as libre from "libreoffice-convert";
import { mkdirIfNotExists } from "@/utils/tools";
const convertAsync = promisify(libre.convert);

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async buildFilePath(file: Express.Multer.File) {
    // const ipV4 = await publicIp.v4();
    // 静态资源根目录 + 上传文件目录 + 文件名。配置静态服务和上传路径相同，就能通过服务端 ip + 路径直接访问上传后的文件
    // http://193.123.254.139:3030/static/uploads/DK7ERTWZQWJ4UMQ2VJS2LE-clk011c-1.9.5.pdf
    const mimeType = file.mimetype.split("/")[1];
    const filePath = `${UPLOAD_FOLDER}/${mimeType || DEFAULT_MIMETYPE}/${
      file.filename
    }`;

    // 文件转换
    const previewPath = await this.officeConvert(
      `${STATIC_PATH}${filePath}`,
      file.filename.replace(/\..+$/, ""),
    );

    const res = await this.create({
      staticPath: `${SERVE_ROOT}${filePath}`,
      filePath,
      previewPath,
      previewStaticPath: `${SERVE_ROOT}${previewPath.replace(STATIC_PATH, "")}`,
      mimeType,
      fileSize: file.size,
      uploadTime: new Date(),
    });

    return res; // filename 新名字，在 UploadModule 中配置。originalname 原文件名
  }
  // 文件信息入库
  async create(dto: FileEntity) {
    const newFile = new FileEntity();
    Object.assign(newFile, dto);
    const res = await this.fileRepository.save(newFile);
    return res;
  }
  // 文件转换 to pdf TODO:排除不可转换的文件，excel 分页问题
  async officeConvert(inputPath: string, fileName: string) {
    const ext = ".pdf";
    const outputFolder = join(STATIC_PATH, PREVIEW_FOLDER);
    const outputPath = join(outputFolder, `${fileName}${ext}`);
    mkdirIfNotExists(outputFolder);
    // Read file
    const docxBuf = await fs.readFile(inputPath);

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
    const pdfBuf = await convertAsync(docxBuf, ext, undefined);

    // Here in done you have pdf file which you can save or transfer in another stream
    await fs.writeFile(outputPath, pdfBuf);
    return outputPath;
  }
}
