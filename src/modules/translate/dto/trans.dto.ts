import { IsNotEmpty } from "class-validator";
import { TranslateOption } from "../translate.interface";
import { ApiProperty } from "@nestjs/swagger";

export class TransDto {
  @IsNotEmpty()
  @ApiProperty({ example: "测试翻译" })
  text: string;

  @ApiProperty({ example: '{"from": "zh-cn", "to": "en"}' })
  options: TranslateOption;
}
