import { join } from 'path';
export default {
  type: 'mysql',
  // host: 'localhost',
  socketPath: '/tmp/mysql.sock',
  port: 3306,
  username: 'root',
  password: 'admin123',
  database: 'nest_blog',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
};
