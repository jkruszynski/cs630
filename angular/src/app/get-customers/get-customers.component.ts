import { Component, OnInit } from '@angular/core';
import {Service} from '../services/services';
import {CustomerModel} from '../models/customer';
import {MatTableDataSource} from '@angular/material/table';
import {GetCustomerOrdersComponent} from '../get-customer-orders/get-customer-orders.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-get-customers',
  templateUrl: './get-customers.component.html',
  styleUrls: ['./get-customers.component.css']
})
export class GetCustomersComponent implements OnInit {

  constructor(private service: Service, public dialog: MatDialog) { }

  customers: CustomerModel[];

  columnsToDisplay = ['id', 'name', 'address', 'phone', 'email'];
  // @ts-ignore
  dataSource = new MatTableDataSource(this.customers);

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.service.getCustomers().subscribe(data => {
      if (data) {
        this.customers = data;
        this.customers.forEach((element) => {
          console.log(element);
        });
        this.dataSource = new MatTableDataSource(this.customers);
      }
    });
  }

  viewCustomerOrders(row): void {
    const dialogRef = this.dialog.open(GetCustomerOrdersComponent, {
      data: {
        id: row.id
      }
    });

  }

}
