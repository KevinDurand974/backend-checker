import 'dotenv/config';
import { createConnection } from 'mysql2';

export default createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT!,
}).promise();
