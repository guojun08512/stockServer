
import config from './config';

const dbConfig = {
  host: config.get('MYSQL_DB_HOST') || 'localhost',
  port: config.get('MYSQL_DB_PORT') || 3306,
  username: config.get('MYSQL_DB_USER') || 'root',
  password: config.get('MYSQL_DB_PASSWORD') || '',
  database: config.get('MYSQL_DB_NAME') || 'pay_server',
  dialect: 'mysql',
};

export default dbConfig;
