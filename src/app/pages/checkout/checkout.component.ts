import { Component, OnInit } from '@angular/core';
import { ECommerceService } from 'src/app/services/ecommerce.service';
import {
  faPlusCircle,
  faMinusCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass'],
})
export class CheckoutComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faTrash = faTrash;
  modalRef: NgbModalRef;

  constructor(
    public eCommerce: ECommerceService,
    private modalService: NgbModal
  ) {
    this.eCommerce.isCustomerLogged();
  }

  async sendOrder() {
    if (this.eCommerce.getCustomer() === null) {
      this.modalRef = this.modalService.open(LoginModalComponent);
      this.eCommerce.customer$.subscribe((user) => {
        if (user !== null) {
          this.eCommerce.sendOrder();
        }
      });
    } else {
      this.eCommerce.sendOrder();
    }
  }

  ngOnInit(): void {}
}
