import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/types/IProduct';
import { ECommerceService } from 'src/app/services/ecommerce.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    public eCommerce: ECommerceService,
    private modalService: NgbModal
  ) {
    this.eCommerce.products$.subscribe((products) => {
      this.products = products;
    });
  }

  openAddProductModal(product?: IProduct) {
    const modalRef = this.modalService.open(AddProductComponent);
    modalRef.componentInstance['product'] = product;
  }

  ngOnInit(): void {}
}
