import { Component, OnInit } from '@angular/core';
import { ECommerceService } from 'src/app/services/ecommerce.service';
import { IOrder } from 'src/app/types/IOrder';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {
  orders: IOrder[] = []

  constructor(public eCommerce: ECommerceService) {
    this.eCommerce.orders$.subscribe((orders) => {
      this.orders = orders;
    });
  }

  ngOnInit(): void {
  }

}
