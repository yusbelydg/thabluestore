import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true; // Permiso para acceder a una ruta
    // Puedo proteger varias rutas con el mismo guardian
      
    /*return this.authService.hasUser().pipe(
      //tap(user => console.log(user)), // Debugeo
      map(user => user === null ? false: true)
    ); // Aqui sabemos si el usuario esta autentificado o no
    */

    return this.authService.hasUser()
    .pipe(
      map(user => {
        if(!user){
          return this.router.parseUrl('/auth/login'); // return this.router.parseUrl('/');
        }

        return true;
      })
    ); // https://juristr.com/blog/2018/11/better-route-guard-redirects/
  }
  
}
