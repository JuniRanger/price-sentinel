import cron from "node-cron";
import { getAllProducts, updateProductPrice } from "../services/product.service";
import { scrapeProduct } from "../services/scraper.service";
import { sendPriceAlert } from "../services/notification.service";

/**
 * Starts the price monitor cron job.
 * Runs every 30 minutes: fetches all products, scrapes each URL,
 * compares new price with stored price, logs drops, and updates the DB.
 */
export const startPriceMonitorJob = (): void => {
  cron.schedule("*/30 * * * *", async () => {
    console.log("[Cron] Running price monitor job");

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
          console.error(`Failed to update product ID ${id}`, error);
        }
      }
    } catch (error) {
      console.error("[Cron] Failed to run price monitor job", error);
    }
  });
};
