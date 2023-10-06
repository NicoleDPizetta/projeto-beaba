import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const port = process.env.db_port as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.db_host,
  port: port,
  username: process.env.db_user,
  password: process.env.db_pass,
  database: process.env.db_name,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
