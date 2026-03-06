import { Request, Response } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  updateProductPrice,
} from "../services/product.service";
import { Product } from "../models/product.model";
import { scrapeProduct } from "../services/scraper.service";
import { sendPriceAlert } from "../services/notification.service";

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

export const listProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();

    const pageSize = 6;
    const pageParam = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
    const parsedPage = pageParam ? parseInt(pageParam as string, 10) : 1;
    const currentPage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

    const totalItems = products.length;
    const totalPages = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 1;
    const safePage = Math.min(currentPage, totalPages);

    const startIndex = (safePage - 1) * pageSize;
    const pageItems = products.slice(startIndex, startIndex + pageSize);

    const productsWithStatus: ProductViewModel[] = pageItems.map((p) => ({
      ...p,
      status: getStatus(p),
    }));

    const hasPrev = safePage > 1;
    const hasNext = safePage < totalPages;

    res.render("products/index", {
      title: "Monitored Products",
      products: productsWithStatus,
      currentPage: safePage,
      totalPages,
      hasPrev,
      hasNext,
      prevPage: hasPrev ? safePage - 1 : null,
      nextPage: hasNext ? safePage + 1 : null,
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
    const { url, email } = req.body;

    await createProduct({
      url,
      email,
    });

    res.redirect("/products");
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).send("Failed to create product");
  }
};

export const deleteProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      res.redirect("/products");
      return;
    }

    await deleteProductById(id);
    res.redirect("/products");
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).send("Failed to delete product");
  }
};

export const refreshAllProductsHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();

    for (const product of products) {
      const { id, url, currentPrice, email, name } = product;

      if (!id) continue;

      try {
        const { name: scrapedName, price: newPrice } = await scrapeProduct(url);

        if (newPrice == null) {
          console.warn(`Unable to parse price for product ID ${id}`);
          continue;
        }

        const previousPrice = currentPrice ?? newPrice;
        const productName = scrapedName ?? name ?? `Product #${id}`;

        if (currentPrice != null && newPrice < currentPrice) {
          console.log(`PRICE DROP DETECTED for ${productName}`);
          await sendPriceAlert(email ?? "", productName, currentPrice, newPrice);
        }

        await updateProductPrice(id, newPrice, previousPrice, scrapedName);
      } catch (error) {
        console.error(`Failed to refresh product ID ${id}`, error);
      }
    }

    res.redirect("/products");
  } catch (error) {
    console.error("Error refreshing products", error);
    res.status(500).send("Failed to refresh products");
  }
};


