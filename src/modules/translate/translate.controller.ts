import { Post, Body, Controller } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TransDto } from "./dto/trans.dto";
import { TranslateService } from "./translate.service";
import { TranslateResult } from "./translate.interface";

// @ApiBearerAuth()
@ApiTags("translate")
@Controller("translate")
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}
  @ApiOperation({ summary: "translate" })
  @ApiBody({ type: TransDto })
  @Post() // 请求 url /translate。路径 是方法名。 @Body("trans") 请求对象不存在属性 "trans" 报错 TypeError: Cannot read properties of undefined。和校验ValidationExecutor 无关
  translate(@Body() trans: TransDto): Promise<TranslateResult> {
    return this.translateService.translate(trans);
  }
}
