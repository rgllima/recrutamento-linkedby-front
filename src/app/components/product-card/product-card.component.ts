import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IProduct } from 'src/app/types/IProduct';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct;
  @Output() addProductToCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getDiscount(): string {
    return (this.product.discount * 100).toFixed(0);
  }

  getPrice(): string {
    return this.product.price.toFixed(2).replace('.', ',');
  }

  getPriceWithDiscount(): string {
    return ((1 - this.product.discount) * this.product.price).toFixed(2).replace('.', ',');
  }

  addProduct(): void {
    this.addProductToCart.emit(this.product)
  }
}
