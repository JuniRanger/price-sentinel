"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const initDB = async () => {
    const db = await (0, sqlite_1.open)({
        filename: "database.sqlite",
        driver: sqlite3_1.default.Database
    });
    await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      nameSelector TEXT NOT NULL,
      priceSelector TEXT NOT NULL,
      name TEXT,
      currentPrice REAL,
      lastPrice REAL,
      email TEXT,
      createdAt TEXT
    )
  `);
    return db;
};
exports.initDB = initDB;
//# sourceMappingURL=db.js.map