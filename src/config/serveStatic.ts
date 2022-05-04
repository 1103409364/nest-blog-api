import { join } from "path";

export const serveStaticOption = {
  rootPath: join(__dirname, "../../", "public"),
  serveRoot: "/static",
};
