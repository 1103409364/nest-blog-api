import { join } from "path";
import { ROOT, SERVE_ROOT } from "./constants";

// http://服务端 ip:3030/static/uploads/111.png
export const serveStaticOption = {
  rootPath: join(__dirname, "../../", ROOT),
  serveRoot: SERVE_ROOT, // 访问前缀，和 /api 区分开
};
