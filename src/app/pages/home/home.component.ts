import { Component, OnInit } from '@angular/core';
import { ECommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(public eCommerce: ECommerceService) {}

  ngOnInit(): void {}
}
