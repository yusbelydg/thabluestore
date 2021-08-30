import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable(); // cart$ es un tipo de dato observable

  constructor() { }

  getCart() {
  }

  addCart(product: Product) {
    // No debo modificar el observable directamente, por el principio de inmutabilidad
    // debo actualizar el array simple de productos y luego ese arry asignarselo al array observab

    this.products = [...this.products, product]; // Para seguir el principio de inmutabilidad creo siempre un nuevo arreglo en lugar usar push, 
                                                // Y agrego los productos que tengo y el ultimo producto agregado al carrito, asi no tenemos errores de hacer referencia al mismo array
    this.cart.next(this.products); // .next() notifica a todos los componentes que esten subscritos, que algo se agreg'o al carrito, que hubo un cambio
  }

  deleteProduct(id:string) { 
    // No debo modificar el observable directamente
    // debo actualizar el array simple de productos y luego ese arry asignarselo al array observable
    
    // Opcion menos eficiente
    /* this.products = this.products.filter((product:any) => {
      return product.id !== id;
    }) */

    // Opcion mas eficiente
    const eliminar = this.products.findIndex(product => product.id === id); 
    this.products.splice(eliminar, 1)

    this.cart.next(this.products);
  }

  clearCart() {
    //this.cart$ = of(<any>[]);
    this.cart.next([]); 
  }

}
