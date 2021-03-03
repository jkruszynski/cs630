import { Component, OnInit } from '@angular/core';
import {CustomerModel} from '../models/customer';
import {Service} from '../services/services';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  constructor(private service: Service) { }

  newCustomer: CustomerModel;

  ngOnInit(): void {
    this.newCustomer = new CustomerModel();
    this.newCustomer.name = null;
    this.newCustomer.address = null;
    this.newCustomer.email = null;
    this.newCustomer.phone = null;
  }

  addCustomer(): void {
    this.service.addCustomer(this.newCustomer);
  }

}
