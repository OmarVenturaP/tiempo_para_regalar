import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

let pool;

export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      ssl: {
        ca: fs.readFileSync(path.join(process.cwd(), 'ca.pem')),
        rejectUnauthorized: true 
      },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};