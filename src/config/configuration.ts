// config/configuration.ts
import { join } from "path";

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  // 数据库配置
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    type: process.env.DATABASE_TYPE || "mysql",
    // socketPath: "/tmp/mysql.sock", // socketPath 是用于指定连接 MySQL 数据库时使用的 Unix 套接字文件的路径。 MySQL 数据库不是运行在与应用程序相同的计算机上，那么使用 socketPath 选项将会导致连接失败。
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [join(__dirname, "../", "**/**.entity{.ts,.js}")],
    synchronize: true, // 同步数据库，自动建表、更新表等
    logging: false, //process.env.NODE_ENV === 'dev', // 是否打印日志
  },
});
