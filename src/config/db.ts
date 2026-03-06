import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let dbInstance: Database<sqlite3.Database, sqlite3.Statement> | null = null;

const DB_DIR = path.join(__dirname, "..", "..", "database");
const DB_PATH = path.join(DB_DIR, "pricesentinel.db");

const CREATE_PRODUCTS_TABLE = `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    nameSelector TEXT NOT NULL,
    priceSelector TEXT NOT NULL,
    name TEXT,
    currentPrice REAL,
    lastPrice REAL,
    email TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

export const initDB = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  if (dbInstance) return dbInstance;

  await fs.promises.mkdir(DB_DIR, { recursive: true });

  dbInstance = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  await dbInstance.exec(CREATE_PRODUCTS_TABLE);
  return dbInstance;
};
