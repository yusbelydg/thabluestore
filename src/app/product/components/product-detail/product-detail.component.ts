import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// Esto es una inyeccion de dependencias (ProductosService)
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.model';

import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  //product!: Product;

  @Input() product!: Product; // va a recibir una propiedad automaticamnete desde otro componente
  @Output() productClicked: EventEmitter<any> = new EventEmitter(); // Event emitter que puede producir cualquier valor (any)

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // console.log(params); // estos params son los mismos que pongamos en el routing de servicio productDetail en este caso :id

      const id = params.id; // console.log(id);
      this.fetchProduct(id); // Cambiamos el this.productService.getProduct() por este fetchProduct()
      //this.product = this.productsService.getProduct(id) as unknown as Product; // ! o as Product
      // console.log(this.product);
    }); // Con suscribe escucho lo cambios que hayan en los parametros, recibimos con function array los parametros de esa ruta
  }

  fetchProduct(id: string) {
    this.productsService.getProduct(id)
    .subscribe(product => {
      this.product = product;
      //console.log(product);
    });
  }

  createProduct() {
    const newProduct: Product = {
      id: '222',
      title: 'nuevo desde angular',
      image: 'assets/images/banner-1.jpg',
      price: 30000,
      description: 'nuevo producto'
    };

    this.productsService.createProduct(newProduct)
    .subscribe( product => {
      console.log();
      
    })
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      image: 'assets/images/banner-1.jpg',
      price: 555555,
      description: 'edicion titulo'
    };

    this.productsService.updateProduct('2', updateProduct)
    .subscribe( product => {
      console.log(product);
    });
  }

  deleteProduct() {
    this.productsService.deleteProduct('222')
    .subscribe(response => {
      console.log(response);
    }); // En nuestro caso nos va a devolver un true si fue elminado correctamente
  }

  addCart() {
    console.log('Añadir al carrito');
    this.cartService.addCart(this.product);

    this.toastr.success('¡Agregado al carrito con exito!', 'Producto agregado', 
      {
          positionClass: 'toast-bottom-right',
          closeButton: true,
          newestOnTop: true,
      });
  }

}
