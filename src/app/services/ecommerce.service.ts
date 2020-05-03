import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/Order';
import { IOrderItem } from '../types/OrderItem';
import { Product } from '../models/Product';
import { ApiService } from './api.service';
import { ICustomer } from '../types/ICustomer';
import { IOrder } from '../types/IOrder';
import { IAlert } from '../types/IAlert';

@Injectable({ providedIn: 'root' })
export class ECommerceService {
  private readonly _customer = new BehaviorSubject<ICustomer>(null);
  private readonly _products = new BehaviorSubject<Product[]>([]);
  private readonly _order = new BehaviorSubject<Order>(new Order());
  private readonly _orderItems = new BehaviorSubject<IOrderItem[]>([]);
  private readonly _alert = new BehaviorSubject<IAlert>(null);

  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
    this.fetchProducts();
  }

  readonly customer$ = this._customer.asObservable();
  readonly products$ = this._products.asObservable();
  readonly order$ = this._order.asObservable();
  readonly orderItems$ = this._orderItems.asObservable();
  readonly alert$ = this._alert.asObservable();

  addProductToCart(product: Product): void {
    let order: Order = this._order.value;
    order.pushProduct(product);
    this._order.next(order);
    this._orderItems.next(order.items);
    this._alert.next({ type: 'info', message: 'Produto Adicionado!' });
    console.log(this._order.value);
  }

  removeProductToCart(product: Product): void {
    let order: Order = this._order.value;
    order.removeProduct(product);
    this._order.next(order);
    this._orderItems.next(order.items);
    console.log(this._order.value);
  }

  deleteOrderItem(orderItem: IOrderItem): void {
    let order: Order = this._order.value;
    order.removeOrderItem(orderItem);
    this._order.next(order);
    this._orderItems.next(order.items);
    this._alert.next({ type: 'info', message: 'Item Removido!' });
    console.log(this._order.value);
  }

  doLogin(customer: ICustomer): void {
    this.apiService
      .getInstance()
      .post('/login', { email: customer.email, password: customer.password })
      .then((res) => {
        if (res !== undefined) {
          customer.password = '';
          customer.name = res.data.name;
          customer.id = res.data.id;
          console.log(customer, res.data);
          this._customer.next(customer);
          this._alert.next({ type: 'success', message: 'Login bem sucedido!' });
        } else {
          this._alert.next({ type: 'danger', message: 'Senha incorreta!' });
        }
      })
      .catch((err: Error) => {
        console.log(err.message);
        this._alert.next({
          type: 'danger',
          message: 'Usuário não encontrado!',
        });
      });
  }

  fetchUser(): void {
    //todo verificar se o usuário existe e está logado
  }

  fetchProducts(): void {
    this.apiService
      .getInstance()
      .get('/product/catalog')
      .then((res) => {
        let products: Product[] = [];
        for (const data of res.data) {
          products.push(
            new Product(
              data['id'],
              data['title'],
              data['cover'],
              data['description'],
              data['discount'],
              data['price'],
              data['stock'],
              data['available'],
              data['createdAt']
            )
          );
        }

        this._products.next(products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  sendOrder(): void {
    let order: IOrder = this._order.value;
    order.customer = this._customer.value;

    this.apiService
      .getInstance()
      .post('/order', order)
      .then((res) => {
        if (res !== undefined) {
          this._alert.next({
            type: 'info',
            message: 'Pedido Realizado com Sucesso!',
          });
          console.log(res.data);
          this._order.next(new Order());
          this._orderItems.next([]);
          this.fetchProducts();
        } else {
          this._customer.next(null);
          this._alert.next({
            type: 'warning',
            message: 'Faça login novamente!',
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        this._alert.next({
          type: 'danger',
          message: err.message,
        });
      });
  }

  async isCustomerLogged(): Promise<boolean> {
    let isLogged = false;
    await this.apiService
      .getInstance()
      .get(`/check`)
      .then((res) => {
        if (res !== undefined) {
          isLogged = true;
        } else {
          this._customer.next(null);
        }
      });

    return isLogged;
  }

  getCustomer(): ICustomer {
    return this._customer.value;
  }
}
