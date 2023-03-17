import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileUploadDto } from "./dto/file-upload.dto";
import { FileService } from "./file.service";

@ApiTags("file upload")
@ApiBearerAuth()
@Controller("upload")
export class FileController {
  constructor(private readonly uploadService: FileService) {}
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "file",
    type: FileUploadDto,
  })
  @Post("file")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.buildFilePath(file);
  }

  @Post("files")
  @UseInterceptors(FileInterceptor("files"))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      files: files.map((f) => this.uploadService.buildFilePath(f)),
    };
  }
}
