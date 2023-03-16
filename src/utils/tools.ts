import * as fs from "fs";

/**
 * 创建文件夹，如果文件夹不存在。另一种写法使用 try catch fs.accessSync(directoryPath)
 * @param path 要创建的目录路径
 */
export function mkdirIfNotExists(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log(`"${path}" 文件夹已创建`);
  } else {
    console.log(`"${path}" 文件夹已存在`);
  }
}
