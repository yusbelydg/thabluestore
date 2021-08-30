import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from './../contact/components/contact/contact.component';

import { ContactRoutingModule } from './contact-routing.module';
import { MaterialModule } from './../material/material.module'

@NgModule({
    declarations: [
        ContactComponent
    ],
    imports: [
        ContactRoutingModule,
        CommonModule,
        MaterialModule
    ]

})
export class ContactModule {

}