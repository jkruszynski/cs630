import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AppComponent} from './app.component';
import {GetCustomersComponent} from './get-customers/get-customers.component';
import {GetAllOrdersComponent} from './get-all-orders/get-all-orders.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {NewItemComponent} from './new-item/new-item.component';
import {NewOrderComponent} from './new-order/new-order.component';

const routes: Routes = [
  { path: 'home', component: AppComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'customers', component: GetCustomersComponent},
  { path: 'orders', component: GetAllOrdersComponent},
  { path: 'addCustomer', component: NewCustomerComponent},
  { path: 'addItem', component: NewItemComponent},
  { path: 'newOrder', component: NewOrderComponent}
];


const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};


@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}

