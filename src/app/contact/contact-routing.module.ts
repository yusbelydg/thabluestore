import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
    {
        path: '',// Ruta inicial
        component: ContactComponent
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ContactRoutingModule {

}