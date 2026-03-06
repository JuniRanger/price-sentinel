import { initDB } from "../config/db";
import { Product } from "../models/product.model";

export type CreateProductInput = Pick<Product, "url" | "nameSelector" | "priceSelector" | "email">;

export const createProduct = async (input: CreateProductInput): Promise<void> => {
  const db = await initDB();

  const { url, nameSelector, priceSelector, email } = input;

  await db.run(
    `
      INSERT INTO products (url, nameSelector, priceSelector, email)
      VALUES (?, ?, ?, ?)
    `,
    [url, nameSelector, priceSelector, email ?? null],
  );
};

export const getAllProducts = async (): Promise<Product[]> => {
  const db = await initDB();

  const rows = await db.all<Product[]>(`
    SELECT
      id,
      url,
      nameSelector,
      priceSelector,
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

