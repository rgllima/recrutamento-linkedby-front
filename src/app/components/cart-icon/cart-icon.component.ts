import { Component, OnInit } from '@angular/core';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { ECommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.sass'],
})
export class CartIconComponent implements OnInit {
  faShoppingBag = faShoppingBag;

  constructor(public eCommerce: ECommerceService) {
    this.eCommerce.orderItems$;
  }

  ngOnInit(): void {}
}
