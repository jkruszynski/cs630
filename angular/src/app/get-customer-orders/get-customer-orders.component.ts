import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Service} from '../services/services';
import {SalesOverviewModel} from '../models/sales-overview';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-get-customer-orders',
  templateUrl: './get-customer-orders.component.html',
  styleUrls: ['./get-customer-orders.component.css']
})
export class GetCustomerOrdersComponent implements OnInit {

  constructor(private service: Service, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) { }

  sales: SalesOverviewModel[];

  columnsToDisplay = ['id', 'total_sale', 'location', 'sale_date'];
  // @ts-ignore
  dataSource = new MatTableDataSource(this.sales);

  ngOnInit(): void {
    this.getCustomerOrder(this.data.id);
  }

  getCustomerOrder(value: number): void {
    this.service.getCustomerOrders(value).subscribe(data => {
      if (data) {
        this.sales = data;
        this.sales.forEach((element) => {
          console.log(element);
        });
        this.dataSource = new MatTableDataSource(this.sales);
      }
    });
  }

}
