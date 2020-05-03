import { Component, OnInit } from '@angular/core';
import { ECommerceService } from 'src/app/services/ecommerce.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  modalRef: NgbModalRef;

  constructor(
    public eCommerce: ECommerceService,
    private modalService: NgbModal
  ) {}

  openModal(): void {
    this.modalRef = this.modalService.open(LoginModalComponent);
  }

  closeModal(): void {
    this.modalRef.close();
  }

  ngOnInit(): void {}
}
