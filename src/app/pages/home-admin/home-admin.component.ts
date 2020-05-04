import { Component, OnInit } from '@angular/core';
import { ECommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.sass'],
})

export class HomeAdminComponent implements OnInit {
  constructor(public eCommerce: ECommerceService) {
    this.eCommerce.fetchAdminProducts()
    this.eCommerce.fetchAdminOrders()
  }

  ngOnInit(): void {}
}
