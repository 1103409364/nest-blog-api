// import { join } from "path";
import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// 数据库配置
export default registerAs(
  "orm.config",
  (): TypeOrmModuleOptions => ({
    type: "mysql", // 数据库类型
    host: process.env.DB_HOST, // 数据库地址
    port: Number(process.env.DB_PORT), // 数据库端口
    // socketPath: "/tmp/mysql.sock", // socketPath 是用于指定连接 MySQL 数据库时使用的 Unix 套接字文件的路径。 MySQL 数据库不是运行在与应用程序相同的计算机上，那么使用 socketPath 选项将会导致连接失败。
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, // 数据库名称
    // entities: [join(__dirname, "../", "**/**.entity{.ts,.js}")], // 映射到数据库中的表的实体类
    autoLoadEntities: true, // 自动加载实体类 与上面的 entities 二选一
    synchronize: process.env.DB_SYNC === "1", // 是否自动同步数据库表结构 自动建表、更新表字段等，生产环境不要使用
    logging: false, //process.env.NODE_ENV === 'dev', // 是否打印日志
    dropSchema: !!+process.env.DB_DROP_SCHEMA, // 每次初始化数据源时删除模式。谨慎使用此选项，不要在生产中使用它 - 否则您将丢失所有生产数据。此选项在调试和开发期间很有用。
  }),
);
