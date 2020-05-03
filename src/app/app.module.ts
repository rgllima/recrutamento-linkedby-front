import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './layouts/admin/admin.component';
import { EcommerceComponent } from './layouts/ecommerce/ecommerce.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { ProductListComponent } from './pages/home-admin/components/product-list/product-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    CartIconComponent,
    ProductCardComponent,
    AdminComponent,
    EcommerceComponent,
    LoginAdminComponent,
    ProductListComponent,
    CreateProductComponent,
    HomeAdminComponent,
    CarouselComponent,
    CheckoutComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
