import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcommerceComponent } from './layouts/ecommerce/ecommerce.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { AdminComponent } from './layouts/admin/admin.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ProductListComponent } from './pages/home-admin/components/product-list/product-list.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginAdminComponent },
      {
        path: '',
        component: HomeAdminComponent,
        children: [
          {
            path: '',
            component: ProductListComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
