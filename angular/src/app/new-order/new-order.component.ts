import {Component, Inject, Input, OnInit} from '@angular/core';
import {Service} from '../services/services';
import {CustomerModel} from '../models/customer';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {NewOrderModel} from '../models/new-order';
import {MatTableDataSource} from '@angular/material/table';
import {ItemModel} from '../models/item';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  constructor(private service: Service) { }

  newOrder: NewOrderModel;
  items: ItemModel[];

  columnsToDisplay = ['id', 'name', 'price', 'type_desc', 'weight', 'description'];
  // @ts-ignore
  dataSource = new MatTableDataSource(this.items);

  customers: CustomerModel[];
  filteredOptions: Observable<CustomerModel[]>;
  myControl = new FormControl();
  selectedCustomerData: CustomerModel;

  ngOnInit(): void {
    this.newOrder = new NewOrderModel();
    this.getCustomers();
    this.getAllItems();
  }

  getCustomers(): void {
    this.service.getCustomers().subscribe(data => {
      if (data) {
        this.customers = data;

        this.customers.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
    });
  }

  private _filter(value): CustomerModel[] {
    let filterValue = '';
    if (value.name) {
      filterValue = value.name.toLowerCase();
      return this.customers.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    } else if (value) {
      filterValue = value.toLowerCase();
    }
    return this.customers.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // tslint:disable-next-line:typedef
  getOptionText(option) {
    if (option) {
      return option.name;
    } else {
      return '';
    }
  }

  // tslint:disable-next-line:typedef
  selectedCustomer(event) {
    console.log(event.option.value);
    this.selectedCustomerData = event.option.value;
  }


  addOrder() {
    this.newOrder.customer_id = this.selectedCustomerData.id;
    this.service.addOrder(this.newOrder);
  }

  getAllItems(): void {
    this.service.getAllItems().subscribe(data => {
      if (data) {
        this.items = data;
        this.items.forEach((element) => {
          console.log(element);
        });
        this.dataSource = new MatTableDataSource(this.items);
      }
    });
  }

}
