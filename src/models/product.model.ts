export interface Product {
  id?: number;
  url: string;
  name?: string | null;
  currentPrice?: number | null;
  lastPrice?: number | null;
  email?: string | null;
  createdAt?: string;
}
