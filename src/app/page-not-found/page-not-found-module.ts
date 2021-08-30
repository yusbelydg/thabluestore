import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
    // Los declaration aqui son los componentes que va a tener este modulo
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        PageNotFoundRoutingModule, // Como este modulo tiene su routing, debemos importar su sistema de routing
    ]
})
export class PageNotFoundModule {

}