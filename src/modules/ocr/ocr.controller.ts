import { OcrService } from "./ocr.service";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { OcrImageDto } from "./dto/ocr-image.dto";

@ApiTags("OCR")
@Controller("ocr")
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @ApiOperation({ summary: "tesseract ocr" })
  @ApiBody({ type: OcrImageDto })
  @Post()
  recognizeByUrl(@Body("url") url: string) {
    // @Body("url") 无参取到的是整个请求体，带参可以取出其中的某个属性
    return this.ocrService.recognizeByUrl(url);
  }
}
