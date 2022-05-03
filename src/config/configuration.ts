// config/configuration.ts
import { join } from "path";

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    type: process.env.DATABASE_TYPE || "mysql",
    socketPath: "/tmp/mysql.sock",
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [join(__dirname, "../", "**/**.entity{.ts,.js}")],
    synchronize: true, // 同步数据库，自动建表、更新表等
    logging: false, //process.env.NODE_ENV === 'dev', // 是否打印日志
  },
});
