import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { AboutUsRoutingModule } from './about-us.routing.module';

import { MaterialModule } from './../material/material.module'


@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    MaterialModule
  ]
})
export class AboutUsModule { }
