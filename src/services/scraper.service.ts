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

export const scrapeProduct = async (
  url: string,
  nameSelector: string,
  priceSelector: string,
): Promise<ScrapeResult> => {
  const response = await axios.get<string>(url);
  const html = response.data;

  const $ = cheerio.load(html);

  const nameText = $(nameSelector).first().text();
  const priceText = $(priceSelector).first().text();

  return {
    name: nameText?.trim() || null,
    price: parsePrice(priceText),
  };
};

