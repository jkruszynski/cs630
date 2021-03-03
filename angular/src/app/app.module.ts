import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { GetCustomersComponent } from './get-customers/get-customers.component';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { GetCustomerOrdersComponent } from './get-customer-orders/get-customer-orders.component';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GetAllOrdersComponent } from './get-all-orders/get-all-orders.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { NewItemComponent } from './new-item/new-item.component';
import {MatSelectModule} from '@angular/material/select';
import { NewOrderComponent } from './new-order/new-order.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GetCustomersComponent,
    GetCustomerOrdersComponent,
    GetAllOrdersComponent,
    NewCustomerComponent,
    NewItemComponent,
    NewOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: []}],
  bootstrap: [AppComponent]
})
export class AppModule { }
