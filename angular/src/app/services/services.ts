import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerModel} from '../models/customer';
import {SalesOverviewModel} from '../models/sales-overview';
import {ItemModel} from '../models/item';
import {NewOrderModel} from '../models/new-order';

@Injectable({
  providedIn: 'root'
})
export class Service {

  headers = new HttpHeaders({
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS'
  });
  options = {headers: this.headers};

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>('http://localhost:5000/getCustomers');
  }

  getCustomerOrders(custId: number): Observable<SalesOverviewModel[]> {
    return this.http.get<SalesOverviewModel[]>('http://localhost:5000/getCustomerSalesHistory?customer=' + custId);
  }

  getAllOrders(): Observable<SalesOverviewModel[]> {
    return this.http.get<SalesOverviewModel[]>('http://localhost:5000/getAllOrders');
  }

  getAllItems(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>('http://localhost:5000/getAllItems');
  }

  addCustomer(customer: CustomerModel): void {
    this.http.post('http://localhost:5000/addCustomer', customer, this.options).subscribe(data => {
      console.log('successful', data);
    }, error => {
      console.log('error', error);
    });
  }


  addItem(item: ItemModel): void {
    this.http.post('http://localhost:5000/addItem', item, this.options).subscribe(data => {
      console.log('successful', data);
    }, error => {
      console.log('error', error);
    });
  }

  addOrder(order: NewOrderModel): void {
    this.http.post('http://localhost:5000/addOrder', order, this.options).subscribe(data => {
      console.log('successful', data);
    }, error => {
      console.log('error', error);
    });
  }
}
