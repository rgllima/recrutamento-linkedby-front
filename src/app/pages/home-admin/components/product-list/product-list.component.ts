import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/types/IProduct';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = []; // Excluir isso depois
  faEdit = faEdit;
  faTrash = faTrash;

  constructor() {}

  ngOnInit(): void {}
}
