import mysql from "mysql2/promise"

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
  password: process.env.MYSQL_PASSWORD || "",
  user: process.env.MYSQL_USER || "root",
  database: process.env.MYSQL_DATABASE,
  
  waitForConnections: true,
  connectionLimit: 10,
})