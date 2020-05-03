import { Product } from '../models/Product';

export interface IOrderItem {
  id?: number;
  product: Product;
  quantity: number;
  subtotal: number;
}
