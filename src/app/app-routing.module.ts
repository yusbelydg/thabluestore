import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

//import { ProductsComponent } from './product/components/products/products.component';
//import { DemoComponent } from './demo/components/demo/demo.component';
//import { ProductDetailComponent } from './product/components/product-detail/product-detail.component';
import { LayoutComponent } from './layout/layout.component';

import { AdminGuard } from './admin.guard';
import { HeaderComponent } from './shared/components/header/header.component';
//import { Rx } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        //redirectTo: '/header',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule) // component: ContactComponent elimino componet y cargo el modulo de ese componente, esto es por la modularizacion y el lazy loading
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)//component: ProductsComponent
      },
      /*{
        path: 'products/:id', // :id es un parametro dinamico
        //component: ProductDetailComponent
      },*/
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)//component: ContactComponent
      },
      {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)//component: ContactComponent
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)//component: ContactComponent
      },
      { 
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'demo',
        loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)//component: DemoComponent
      },
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard], // Si el guardian esta en falso no permitira entrar a esa ruta, y al contrario si esta en true
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**', // ** significa que no hubo match, debe ir de ultimo
    loadChildren: () => import('./page-not-found/page-not-found-module').then( m => m.PageNotFoundModule) // component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules // Para que los Modulos de cada pagina tarden menos en cargar precarga los modulos
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
