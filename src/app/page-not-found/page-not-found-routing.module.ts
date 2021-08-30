import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',// Ruta inicial
        component: PageNotFoundComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [ // Esto es para que otros modulos lo puedan utilizar
        RouterModule
    ]
})
export class PageNotFoundRoutingModule{

}