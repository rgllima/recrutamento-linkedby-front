export interface IProduct {
  id?: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  discount: number;
  stock: number;
  available: boolean;
  createdAt: string;
}
