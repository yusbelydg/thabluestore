import { Component, OnInit } from '@angular/core';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products!: Product[]; // Otra opcion valida -> products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getAllProducts()
    .subscribe(products => { //recibimos los productos
      this.products = products; // Asignamos los productos que recibimos a nuestra variable productos de este componente
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
    .subscribe( respuesta => {
      console.log(respuesta);
      // this.fetchProducts(); // Para que luego de eliminar un producto, se actualice la interfaz con los productos que quedan
      if (respuesta) { // Si todo bien
        
        console.log('Product deleted');

        const index = this.products.findIndex( product => product.id === id );
        this.products.splice(index, 1); // Splice modifica directamente el array agregando o eliminando elementos y devuleve los elementos borrados
        this.products = [...this.products]; // Se debe crear el array de nuevo, porque si no no actualiza en la interfaz de admin. -> https://stackoverflow.com/questions/56658881/angular-7-ngfor-not-updating-bound-attributes
                                            // Otra forma valida es 
      
      }else {
        console.error('Unable to delete the product');

      }
    });
  }

}
