import { Component, OnInit } from '@angular/core';
import { ECommerceService } from 'src/app/services/ecommerce.service';
import { NgForm } from '@angular/forms';
import { ICustomer } from 'src/app/types/ICustomer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.sass'],
})
export class LoginAdminComponent implements OnInit {
  constructor(public eCommerce: ECommerceService, private router: Router) {
    this.eCommerce.customer$.subscribe(() => {
      this.router.navigateByUrl('/admin');
    });
    //TODO remover --------------------------------
    this.eCommerce.doLoginAsAdmin({
      email: 'admin@admin.com',
      password: '12345678',
      name: '',
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let customer: ICustomer = form.value;
      this.eCommerce.doLoginAsAdmin(customer);
    }
  }

  ngOnInit(): void {}
}
