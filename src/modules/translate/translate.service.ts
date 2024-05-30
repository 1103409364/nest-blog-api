import { Injectable } from "@nestjs/common";
import * as googleTranslate from "google-translate-api";
import { TransDto } from "./dto/trans.dto";
import { TranslateResult } from "./translate.interface";

@Injectable()
export class TranslateService {
  async translate(trans: TransDto): Promise<TranslateResult> {
    // 在node_modules/google-translate-api/index.js中修改 client: 'gtx' 无频率限制 默认值 t 报错
    const res = await googleTranslate(trans.text, trans.options);
    return res;
  }
}
