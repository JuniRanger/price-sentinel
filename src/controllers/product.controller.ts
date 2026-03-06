import { Request, Response } from "express";
import { createProduct, getAllProducts } from "../services/product.service";
import { Product } from "../models/product.model";

interface ProductViewModel extends Product {
  status: string;
}

const getStatus = (product: Product): string => {
  const { currentPrice, lastPrice } = product;

  if (currentPrice == null || lastPrice == null) {
    return "No Change";
  }

  if (currentPrice < lastPrice) {
    return "Price Dropped";
  }

  if (currentPrice > lastPrice) {
    return "Price Increased";
  }

  return "No Change";
};

export const listProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();

    const productsWithStatus: ProductViewModel[] = products.map((p) => ({
      ...p,
      status: getStatus(p),
    }));

    res.render("products/index", {
      title: "Monitored Products",
      products: productsWithStatus,
    });
  } catch (error) {
    console.error("Error listing products", error);
    res.status(500).send("Failed to load products");
  }
};

export const showCreateForm = (_req: Request, res: Response): void => {
  res.render("products/create", {
    title: "Add Product",
  });
};

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, nameSelector, priceSelector, email } = req.body;

    await createProduct({
      url,
      nameSelector,
      priceSelector,
      email,
    });

    res.redirect("/products");
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).send("Failed to create product");
  }
};

