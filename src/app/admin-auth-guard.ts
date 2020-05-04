import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ECommerceService } from './services/ecommerce.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
  constructor(public eCommerce: ECommerceService, private router: Router) {}

  canActivate() {
    if (this.eCommerce.getCustomer() != null) {
      return true;
    }

    this.router.navigateByUrl(this.router.createUrlTree(['/admin/login']));

    return false;
  }
}
