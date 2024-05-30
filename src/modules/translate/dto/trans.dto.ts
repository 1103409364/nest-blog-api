import { IsNotEmpty } from "class-validator";
import { TranslateOption } from "../translate.interface";

export class TransDto {
  @IsNotEmpty()
  text: string;

  options: TranslateOption;
}
