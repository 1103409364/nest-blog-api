import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as xlsx from "xlsx";
import { Builder } from "xml2js";
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
import { Row } from "./file";
const convertAsync = promisify(libre.convert);

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  // 文件转换 to pdf FIXME: excel 分页问题
  async convertToPdf(file: Express.Multer.File) {
    const { filePath, fileName, mimeType } = this.buildFilePath(file);
    const ext = ".pdf";
    const outputFolder = join(STATIC_PATH, PREVIEW_FOLDER);
    const outputPath = join(outputFolder, `${fileName}${ext}`);
    mkdirIfNotExists(outputFolder);
    // Read file
    const fileBuf = await fs.readFile(filePath);

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
    const pdfBuf = await convertAsync(fileBuf, ext, undefined).catch((e) => {
      console.log(e);
      return e;
    });
    if (!pdfBuf) return;
    // Here in done you have pdf file which you can save or transfer in another stream
    await fs.writeFile(outputPath, pdfBuf);
    // return outputPath;

    return await this.save({
      fileName,
      staticPath: `${SERVE_ROOT}${filePath}`,
      filePath,
      previewPath: outputPath,
      previewStaticPath:
        outputPath && `${SERVE_ROOT}${outputPath.replace(STATIC_PATH, "")}`, // 预览方式 ip 端口 + previewStaticPath
      mimeType,
      fileSize: file.size,
      uploadTime: new Date(),
    });
  }
  // excel 转换 xml
  async convertExcelToXml(file: Express.Multer.File) {
    const { filePath, fileName } = this.buildFilePath(file);
    // Read file 存储到 diskStorage file.buffer 为 undefined
    const fileBuf = await fs.readFile(filePath);
    // 读取 Excel 文件
    const workbook = xlsx.read(fileBuf, { type: "buffer" });

    // 将 Excel 转换为 JSON
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelJson = xlsx.utils.sheet_to_json(sheet);

    // 创建 XML 构建器
    const builder = new Builder();
    const xmlData = {
      root: {
        row: excelJson.map((row) => {
          const newRow = {};
          for (const key in row as Row) {
            newRow[key] = row[key];
          }
          return newRow;
        }),
      },
    };

    // 将 JSON 转换为 XML
    const xml = builder.buildObject(xmlData);
    // 转换成功后删除 Excel 文件
    await fs.unlink(filePath).catch((e) => {
      console.log(e);
      return e;
    });
    // XML 文件保存到 outputPath
    const outputFolder = join(STATIC_PATH, PREVIEW_FOLDER);
    mkdirIfNotExists(outputFolder);
    const outputPath = join(outputFolder, `${fileName}.xml`);
    await fs.writeFile(outputPath, xml);
    return outputPath
      ? `${SERVE_ROOT}${outputPath.replace(STATIC_PATH, "")}`
      : ""; // 下载地址 ip 端口 + previewStaticPath;
  }
  // 文件信息入库
  async save(dto: FileEntity) {
    const newFile = new FileEntity();
    Object.assign(newFile, dto);
    const res = await this.fileRepository.save(newFile);
    return res;
  }
  async saveFile(file: Express.Multer.File) {
    const { filePath, fileName, mimeType } = this.buildFilePath(file);
    const res = await this.save({
      fileName,
      staticPath: `${SERVE_ROOT}${filePath}`,
      filePath,
      previewPath: filePath,
      previewStaticPath: `${SERVE_ROOT}${filePath}`,
      mimeType,
      fileSize: file.size,
      uploadTime: new Date(),
    });
    return res;
  }
  buildFilePath(file: Express.Multer.File) {
    // const ipV4 = await publicIp.v4();
    // 静态资源根目录 + 上传文件目录 + 文件名。配置静态服务和上传路径相同，就能通过服务端 ip + 路径直接访问上传后的文件
    // http://193.123.254.139:3030/static/uploads/DK7ERTWZQWJ4UMQ2VJS2LE-clk011c-1.9.5.pdf
    const mimeType = file.mimetype.split("/")[1];
    const filePath = `${UPLOAD_FOLDER}/${mimeType || DEFAULT_MIMETYPE}/${
      file.filename
    }`;

    return {
      filePath: `${STATIC_PATH}${filePath}`,
      fileName: file.filename.replace(/\..+$/, ""),
      mimeType,
    };
    // filename 新名字，在 UploadModule 中配置。originalname 为原文件名
  }
}
