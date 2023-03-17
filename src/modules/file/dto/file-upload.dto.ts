import { ApiProperty } from "@nestjs/swagger";
import { Express } from "express";
export class FileUploadDto {
  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}

export class FilesUploadDto {
  @ApiProperty({ type: "array" })
  files: FileUploadDto;
}
