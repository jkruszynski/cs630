import {Component, Inject, OnInit} from '@angular/core';
import {Service} from '../services/services';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {SalesOverviewModel} from '../models/sales-overview';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-get-all-orders',
  templateUrl: './get-all-orders.component.html',
  styleUrls: ['./get-all-orders.component.css']
})
export class GetAllOrdersComponent implements OnInit {

  constructor(private service: Service, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) { }

  sales: SalesOverviewModel[];

  columnsToDisplay = ['id', 'name', 'total_sale', 'location', 'sale_date'];
  // @ts-ignore
  dataSource = new MatTableDataSource(this.sales);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.service.getAllOrders().subscribe(data => {
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
