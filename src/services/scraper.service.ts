import axios from "axios";
import * as cheerio from "cheerio";

export interface ScrapeResult {
  name: string | null;
  price: number | null;
}

const parsePrice = (rawText: string | undefined | null): number | null => {
  if (!rawText) return null;

  const cleaned = rawText
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[^0-9,.\-]/g, "");

  if (!cleaned) return null;

  const normalized = cleaned.replace(",", ".");
  const value = parseFloat(normalized);

  return Number.isFinite(value) ? value : null;
};

const findProductFromJsonLd = ($: cheerio.CheerioAPI): ScrapeResult => {
  const scripts = $('script[type="application/ld+json"]').toArray();

  for (const el of scripts) {
    const jsonText = $(el).contents().text();
    if (!jsonText) continue;

    try {
      const data = JSON.parse(jsonText);
      const graph = Array.isArray(data)
        ? data
        : Array.isArray((data as any)["@graph"])
          ? (data as any)["@graph"]
          : [data];

      for (const item of graph) {
        if (!item || typeof item !== "object") continue;

        const type = (item as any)["@type"];
        const isProduct =
          typeof type === "string"
            ? type.toLowerCase() === "product"
            : Array.isArray(type) &&
              type.some((t: unknown) => typeof t === "string" && t.toLowerCase() === "product");

        if (!isProduct) continue;

        const name =
          typeof (item as any).name === "string" ? ((item as any).name as string) : null;

        let price: number | null = null;
        const offers = (item as any).offers;

        if (offers) {
          const offerList = Array.isArray(offers) ? offers : [offers];
          for (const offer of offerList) {
            if (!offer || typeof offer !== "object") continue;

            const rawPrice = (offer as any).price ?? (offer as any).priceAmount;
            if (rawPrice != null) {
              price = parsePrice(String(rawPrice));
            }

            if (price == null && (offer as any).priceSpecification) {
              const spec = (offer as any).priceSpecification;
              const specPrice = (spec as any).price ?? (spec as any).priceAmount;
              if (specPrice != null) {
                price = parsePrice(String(specPrice));
              }
            }

            if (price != null) break;
          }
        }

        return {
          name: name ?? null,
          price,
        };
      }
    } catch {
      // Ignore invalid JSON-LD blocks
      continue;
    }
  }

  return { name: null, price: null };
};

export const scrapeProduct = async (url: string): Promise<ScrapeResult> => {
  const response = await axios.get<string>(url);
  const html = response.data;

  const $ = cheerio.load(html);

  // 1) Try structured data (JSON-LD Product)
  let { name, price } = findProductFromJsonLd($);

  // 2) Fallback: common name selectors
  if (!name) {
    const nameSelectors = ["h1", ".product-title", ".product-name", ".title", '[itemprop="name"]'];
    for (const selector of nameSelectors) {
      const text = $(selector).first().text().trim();
      if (text) {
        name = text;
        break;
      }
    }
  }

  // 3) Fallback: common price selectors
  if (price == null) {
    const priceSelectors = [
      ".price",
      ".product-price",
      '[itemprop="price"]',
      ".a-price .a-offscreen",
      ".price-current",
      ".priceFinal",
    ];

    for (const selector of priceSelectors) {
      const text = $(selector).first().text();
      const parsed = parsePrice(text);
      if (parsed != null) {
        price = parsed;
        break;
      }
    }
  }

  return {
    name: name ?? null,
    price: price ?? null,
  };
};

