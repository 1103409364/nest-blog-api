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
import { EXCEL_FIELDS, EXCEL_FIELDS_MAP } from "./constants";
import { PartialRow } from "./file";

const convertAsync = promisify(libre.convert);

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  // 文件转换 to pdf FIXME: excel 分页问题
  async convertToPdf(file: Express.Multer.File) {
    const ext = ".pdf";
    const {
      filePath,
      fileName,
      mimeType,
      outputFilePath,
      staticPath,
      previewStaticPath,
    } = this.buildFilePath(file, ext);
    // Read file
    const fileBuf = await fs.readFile(filePath);
    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
    const pdfBuf = await convertAsync(fileBuf, ext, undefined).catch((e) => {
      console.log(e);
      return e;
    });
    if (!pdfBuf) return null;
    // Here in done you have pdf file which you can save or transfer in another stream
    await fs.writeFile(outputFilePath, pdfBuf);
    // return outputPath;

    return await this.save({
      fileName,
      staticPath,
      filePath,
      previewPath: outputFilePath,
      previewStaticPath,
      mimeType,
      fileSize: file.size,
      uploadTime: new Date(),
    });
  }
  // excel 转换 xml
  async convertExcelToXml(file: Express.Multer.File) {
    const { filePath, outputFilePath, previewStaticPath } = this.buildFilePath(
      file,
      ".xml",
    );
    // Read file 存储到 diskStorage file.buffer 为 undefined
    const fileBuf = await fs.readFile(filePath);
    // 读取 Excel 文件
    const workbook = xlsx.read(fileBuf, { type: "buffer" });

    // 将 Excel 转换为 JSON
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelJson = xlsx.utils.sheet_to_json(sheet);

    // 创建 XML 构建器
    const builder = new Builder({
      renderOpts: {
        pretty: true,
        indent: "  ", // 缩进
        newline: "\n",
        allowEmpty: true, // 是否允许空值，即空标签不闭合 <tag></tag>，默认为 false
      },
    });
    const xmlData = {
      fields: {
        field: excelJson.map((row, i) => {
          const newRow: PartialRow = { id: i + 1 };
          EXCEL_FIELDS.forEach((field) => {
            const result = row[field]?.match(/(Varchar)\((\d+)\)/);
            if (result) {
              newRow.type =
                EXCEL_FIELDS_MAP[result[1].toLowerCase()] || result[1];
              newRow.length = result[2];
            } else if (!newRow[field]) {
              newRow[field] = row[field] || "";
              newRow[field] = newRow[field]
                .replace(/\s/g, "")
                .toLowerCase()
                .replace(/bigint.*/, "bigint");
              newRow[field] = EXCEL_FIELDS_MAP[newRow[field]] || newRow[field];
            }
          });
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
    await fs.writeFile(outputFilePath, xml);
    // 转为浏览器可用的预览路径 ip 端口 + previewStaticPath;
    return previewStaticPath;
  }
  // 文件信息入库
  async save(dto: FileEntity) {
    const newFile = new FileEntity();
    Object.assign(newFile, dto);
    return await this.fileRepository.save(newFile);
  }
  async saveFile(file: Express.Multer.File) {
    const { filePath, fileName, mimeType, staticPath } = this.buildFilePath(
      file,
      "",
    );
    const res = await this.save({
      fileName,
      staticPath,
      filePath,
      previewPath: "",
      previewStaticPath: "",
      mimeType,
      fileSize: file.size,
      uploadTime: new Date(),
    });
    return res;
  }
  // 创建各种路径
  buildFilePath(file: Express.Multer.File, ext: string) {
    // const ipV4 = await publicIp.v4();
    // 静态资源根目录 + 上传文件目录 + 文件名。配置静态服务和上传路径相同，就能通过服务端 ip + 路径直接访问上传后的文件
    // http://193.123.254.139:3030/static/uploads/DK7ERTWZQWJ4UMQ2VJS2LE-clk011c-1.9.5.pdf
    const mimeType = file.mimetype.split("/")[1];
    // 上传保存路径 拼接路径 https://nodejs.org/api/path.html#path_path_join_paths
    const filePath = join(
      UPLOAD_FOLDER,
      mimeType || DEFAULT_MIMETYPE,
      file.filename,
    );
    const fileName = file.filename.replace(/\..+$/, "");
    // 转换保存目录
    const outputFolder = join(STATIC_PATH, PREVIEW_FOLDER);
    // 转换文件保存路径
    const outputFilePath = join(outputFolder, `${fileName}${ext}`);
    // 静态路径
    const staticPath = join(SERVE_ROOT, filePath);
    // 预览路径 预览方式 ip 端口 + previewStaticPath
    const previewStaticPath = join(
      SERVE_ROOT,
      outputFilePath.replace(STATIC_PATH, ""),
    ).replace(/\\/g, "/");
    mkdirIfNotExists(outputFolder);
    return {
      filePath: `${STATIC_PATH}${filePath}`,
      fileName,
      mimeType,
      outputFilePath,
      staticPath,
      previewStaticPath,
    };
    // filename 新名字，在 UploadModule 中配置。originalname 为原文件名
  }
}
