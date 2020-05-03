import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ICustomer } from 'src/app/types/ICustomer';
import { ECommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.sass'],
})
export class LoginModalComponent implements OnInit {
  constructor(
    public eCommerce: ECommerceService,
    public activeModal: NgbActiveModal
  ) {
    this.eCommerce.customer$.subscribe(() => {
      this.dismiss();
    });
  }

  dismiss(): void {
    this.activeModal.close();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let customer: ICustomer = form.value;
      this.eCommerce.doLogin(customer);
    }
  }

  ngOnInit(): void {}
}
