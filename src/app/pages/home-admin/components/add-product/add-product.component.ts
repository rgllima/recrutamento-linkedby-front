import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ICustomer } from 'src/app/types/ICustomer';
import { ECommerceService } from 'src/app/services/ecommerce.service';
import { IProduct } from 'src/app/types/IProduct';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass'],
})
export class AddProductComponent implements OnInit {
  @Input() product: IProduct;
  form: FormGroup;

  constructor(
    public eCommerce: ECommerceService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.eCommerce.products$.subscribe(() => {
      this.dismiss();
    });
  }

  dismiss(): void {
    this.activeModal.close();
  }

  onSubmit() {
    if (this.form.valid) {
      let product: IProduct = this.form.value;
      product.available = this.form.value['available'] === 'true' ? true : false;
      product.discount = product.discount / 100;
      product.stock = parseInt(this.form.value['stock']);
      console.log(product);
      console.log(this.form.value);
      if (this.product == undefined) {
        this.eCommerce.createProduct(product);
      } else {
        product.id = this.product.id;
        this.eCommerce.updateProduct(product);
      }
    }
  }

  createForm(product?: IProduct): FormGroup {
    console.log(product);
    return this.formBuilder.group({
      title: new FormControl(product?.title),
      description: product?.description,
      cover: product?.cover,
      price: product?.price,
      discount: product?.discount * 100,
      available: product?.available,
      stock: product?.stock,
    });
  }

  ngOnInit(): void {
    this.form = this.createForm(this.product);
    console.log(this.form);
  }
}
