import { Injectable } from "@nestjs/common";
import * as tesseract from "node-tesseract-ocr";
// https://github.com/zapolnoch/node-tesseract-ocr
// On Debian/Ubuntu: apt-get install tesseract-ocr 需要在服务器安装
@Injectable()
export class OcrService {
  async recognizeByUrl(url: tesseract.Input) {
    const config = {
      lang: "eng", // default
      oem: 3,
      psm: 3,
    };

    // try {
    // 异常由全局异常过滤器处理
    const text = await tesseract.recognize(url, config);
    // console.log("Result:", text);
    return { text };
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
