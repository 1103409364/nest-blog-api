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
import { staticBaseUrl } from "../../config/constants";
import { FileUploadDto } from "./dto/file-upload.dto";

@ApiTags("file upload")
@ApiBearerAuth()
@Controller("upload")
export class UploadController {
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "file",
    type: FileUploadDto,
  })
  @Post("file")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: staticBaseUrl + file.filename,
    };
  }

  @Post("files")
  @UseInterceptors(FileInterceptor("files"))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      files: files.map((f) => staticBaseUrl + f.originalname),
    };
  }
}
