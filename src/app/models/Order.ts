import { IOrder } from '../types/IOrder';
import { IOrderItem } from '../types/OrderItem';
import { Product } from './Product';
import { ICustomer } from '../types/ICustomer';

export class Order implements IOrder {
  constructor(
    public id?: number,
    public customer?: ICustomer,
    public total: number = 0,
    public items: IOrderItem[] = []
  ) {}

  pushProduct(product: Product) {
    let orderItem = this.checkIfItHasProduct(product);

    if (orderItem !== undefined && product.available) {
      this.incrementOrderItemQuantity(orderItem);
      this.updateOrderItemSubtotal(orderItem);
    }

    if (orderItem === undefined && product.available) {
      this.creteOrderItem(product);
    }

    this.updateTotal();
  }

  removeProduct(product: Product): void {
    let orderItem = this.checkIfItHasProduct(product);

    if (orderItem !== undefined && orderItem.quantity <= 1) {
      this.removeOrderItem(orderItem);
    }

    if (orderItem !== undefined && orderItem.quantity > 1) {
      this.decrementOrderItemQuantity(orderItem);
      this.updateOrderItemSubtotal(orderItem);
    }

    this.updateTotal();
  }

  removeOrderItem(orderItem: IOrderItem): void {
    this.items = this.items.filter((it) => it != orderItem);
    orderItem.product.restoreStock(orderItem.quantity);
  }

  private checkIfItHasProduct(product: Product): IOrderItem {
    return this.items.filter((item) => item.product.id == product.id)[0];
  }

  private creteOrderItem(product: Product): void {
    let subtotal = product.price * (1 - product.discount);
    this.items.push({
      product: product,
      quantity: 1,
      subtotal: parseFloat(subtotal.toFixed(2)),
    });
    product.decrementStock();
  }

  private incrementOrderItemQuantity(orderItem: IOrderItem): void {
    orderItem.quantity++;
    orderItem.product.decrementStock();
  }

  private decrementOrderItemQuantity(orderItem: IOrderItem): void {
    orderItem.quantity--;
    orderItem.product.incrementStock();
  }

  private updateOrderItemSubtotal(orderItem: IOrderItem): void {
    let price = orderItem.product.price;
    let discount = orderItem.product.discount;

    orderItem.subtotal = parseFloat(
      (price * (1 - discount) * orderItem.quantity).toFixed(2)
    );
  }

  private updateTotal(): void {
    this.total = 0;
    this.items.map(
      (a) => (this.total = parseFloat((this.total + a.subtotal).toFixed(2)))
    );
  }

  toString(): string {
    return `Items ${this.items.toString()} - Total: ${this.total}`;
  }
}
