import { initDB } from "../config/db";
import { Product } from "../models/product.model";
import { scrapeProduct } from "./scraper.service";

export interface CreateProductInput {
  url: string;
  email?: string | null;
}

export const createProduct = async (input: CreateProductInput): Promise<void> => {
  const db = await initDB();

  const { url, email } = input;

  let name: string | null = null;
  let currentPrice: number | null = null;

  try {
    const scraped = await scrapeProduct(url);
    name = scraped.name;
    currentPrice = scraped.price;
  } catch (error) {
    console.error("Failed to scrape product on create", error);
  }

  await db.run(
    `
      INSERT INTO products (url, name, currentPrice, email)
      VALUES (?, ?, ?, ?)
    `,
    [url, name, currentPrice, email ?? null],
  );
};

export const getAllProducts = async (): Promise<Product[]> => {
  const db = await initDB();

  const rows = await db.all<Product[]>(`
    SELECT
      id,
      url,
      name,
      currentPrice,
      lastPrice,
      email,
      createdAt
    FROM products
    ORDER BY createdAt DESC
  `);

  return rows;
};

export const updateProductPrice = async (
  id: number,
  newPrice: number | null,
  lastPrice: number | null,
  name?: string | null,
): Promise<void> => {
  const db = await initDB();

  await db.run(
    `
      UPDATE products
      SET
        currentPrice = ?,
        lastPrice = ?,
        name = COALESCE(?, name)
      WHERE id = ?
    `,
    [newPrice, lastPrice, name ?? null, id],
  );
};

export const deleteProductById = async (id: number): Promise<void> => {
  const db = await initDB();

  await db.run(
    `
      DELETE FROM products
      WHERE id = ?
    `,
    [id],
  );
};

