import { Component } from '@angular/core';
import { ECommerceService } from './services/ecommerce.service';
import { IAlert } from './types/IAlert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'ecommerce';
  alerts: IAlert[] = [];

  constructor(public eCommerce: ECommerceService) {
    this.eCommerce.alert$.subscribe((alert) => {
      if (alert != null) {
        this.pushAlert(alert);
      }
    });
  }

  pushAlert(alert: IAlert): void {
    this.alerts.push(alert);
    setTimeout(() => {
      this.popAlert(alert);
    }, 2000);
  }

  popAlert(alert: IAlert): void {
    this.alerts = this.alerts.filter((al) => al != alert);
  }

  close(alert: IAlert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
