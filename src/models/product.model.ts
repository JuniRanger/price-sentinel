export interface Product {
  id?: number;
  url: string;
  nameSelector: string;
  priceSelector: string;
  name?: string | null;
  currentPrice?: number | null;
  lastPrice?: number | null;
  email?: string | null;
  createdAt?: string;
}
