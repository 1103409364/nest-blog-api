// config/configuration.ts
import { join } from "path";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  // 数据库配置
  database: {
    type: process.env.DB_TYPE || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    // socketPath: "/tmp/mysql.sock", // socketPath 是用于指定连接 MySQL 数据库时使用的 Unix 套接字文件的路径。 MySQL 数据库不是运行在与应用程序相同的计算机上，那么使用 socketPath 选项将会导致连接失败。
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, "../", "**/**.entity{.ts,.js}")],
    synchronize: true, // 同步数据库，自动建表、更新表等
    logging: false, //process.env.NODE_ENV === 'dev', // 是否打印日志
    dropSchema: !!+process.env.DB_DROP_SCHEMA, // 每次初始化数据源时删除模式。谨慎使用此选项，不要在生产中使用它 - 否则您将丢失所有生产数据。此选项在调试和开发期间很有用。
  },
});
