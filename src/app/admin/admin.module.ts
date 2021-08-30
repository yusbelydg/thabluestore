import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

import { CountUpModule } from 'ngx-countup';

@NgModule({
  declarations: [
    ProductFormComponent, 
    NavComponent, 
    InventoryComponent, 
    DashboardComponent, 
    ProductsListComponent, 
    OrdersComponent, 
    FormProductComponent, 
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CountUpModule
  ]
})
export class AdminModule { }
