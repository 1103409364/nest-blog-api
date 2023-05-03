import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";
import { Express } from "express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { FileUploadDto } from "./dto/file-upload.dto";
import { FileService } from "./file.service";

@ApiTags("file manage")
@ApiBearerAuth()
@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("upload")
  @ApiOperation({ summary: "upload file and convert to PDF" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "file",
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.convertToPdf(file);
  }

  // https://docs.nestjs.com/techniques/file-upload
  // https://swagger.io/docs/specification/describing-request-body/file-upload/
  // 多文件上传 https://docs.nestjs.com/techniques/file-upload#any-files
  @Post("uploadAny")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "array",
          items: { type: "string", format: "binary" },
        },
      },
    },
  })
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const promiseArr = files.reduce((res, cur) => {
      res.push(this.fileService.convertToPdf(cur));
      return res;
    }, []);

    return await Promise.all(promiseArr);
  }
  // 用户文件上传 头像 背景
  @Post("uploadMulti")
  @ApiOperation({ summary: "upload avatar and background" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        avatar: { type: "string", format: "binary" },
        background: { type: "string", format: "binary" },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "avatar", maxCount: 1 },
      { name: "background", maxCount: 1 },
    ]),
  )
  uploadFileUser(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    const res = {};
    const promiseArr = Object.keys(files).reduce((promises, key) => {
      promises.push(
        (async () => {
          res[key] = await this.fileService.saveFile(files[key][0]);
        })(),
      );
      return promises;
    }, []);
    return Promise.all(promiseArr).then(() => res);
  }
}
