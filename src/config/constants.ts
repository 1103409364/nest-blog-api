import { resolve, join } from "path";
const appRoot = resolve(process.cwd());
// __dirname; 当前模块的目录名
export const STATIC_PATH = join(appRoot, "public"); // 静态目录
export const UPLOAD_FOLDER = "/uploads";
export const PREVIEW_FOLDER = "/preview";
export const SERVE_ROOT = "/static"; // 静态文件请求前缀
export const DEFAULT_MIMETYPE = "others";
export const EXCLUDE_PATHS = ["/status"];

// 自定义状态码
// export enum BusinessStatus {}
