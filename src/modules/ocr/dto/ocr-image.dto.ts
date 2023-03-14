import { ApiProperty } from "@nestjs/swagger";
export class OcrImageDto {
  @ApiProperty({
    type: "string",
    default: "https://tesseract.projectnaptha.com/img/eng_bw.png",
  })
  url: string;
}
