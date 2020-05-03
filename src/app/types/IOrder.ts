import { IOrderItem } from './OrderItem';
import { ICustomer } from './ICustomer';

export interface IOrder {
  id?: number;
  customer?: ICustomer
  items: Array<IOrderItem>;
  total: number;
}
