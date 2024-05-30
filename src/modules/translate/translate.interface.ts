export interface TranslateOption {
  from?: string | undefined;
  to?: string | undefined;
  raw?: boolean | undefined;
}
// 从 "@types/google-translate-api 拷出来。
// 错误 TS4053：导出类的公共方法的返回类型具有或正在使用来自外部模块的名称 TranslateResult
export interface TranslateResult {
  text: string;
  from: {
    language: {
      didYouMean: boolean;
      iso: string;
    };
    text: {
      autoCorrected: boolean;
      value: string;
      didYouMean: boolean;
    };
  };
  raw: string;
}
