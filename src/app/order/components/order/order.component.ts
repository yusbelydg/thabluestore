import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
//import {StepperOrientation} from '@angular/material/stepper';

import { Product } from './../../../core/models/product.model';
import { CartService } from './../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]>;
  compraExitosa = false;
  formError = false;
  formErrorMesagge = '';
  //subtotal = products$.forEach(product.price => suma = suma+ product);
  
  // formGroup1: FormGroup;
  formGroup1 = this.formBuilder.group({
    nombre:['', Validators.required],
    apellido:['', Validators.required],
    documento:['', Validators.required],
    direccion:['', Validators.required],
    ciudad: ['', Validators.required],
    estado: ['', Validators.required],
    shipping: ['free', Validators.required]
  });

  formGroup2 = new FormGroup({
    formaPago: new FormControl('', Validators.required)
  }); 

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    breakpointObserver: BreakpointObserver
  ) { 
    this.products$ = this.cartService.cart$; // Ya que cart$ es un observable podriamos asignar directamente sin necesidad de llamar a un servicio que se traiga algo
    this.compraExitosa = false;

    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
    this.compraExitosa = false;
  }                                 

  repeticiones(producto: string) {
    
  }

  get form2(){
    if(this.formGroup2.get('formaPago')) {
    }

    return this.formGroup2.controls;
  }

  pagoCompra() {
      
    if(this.formGroup2.valid){
      // registrar compra en la base de datos
      this.cartService.clearCart();
      this.compraExitosa = true;
      this.formError = false;
      this.formErrorMesagge = '';
      this.formGroup1.reset();
    } else {
      this.compraExitosa = false;
    }

    if(this.formGroup2.hasError('required')) {
    }
    
    if(this.formGroup2.controls.formaPago.untouched) {
      this.formError = true;
      this.formErrorMesagge='Forma de pago es requerida.';
      this.compraExitosa = false;
    }
  }

  deleteProduct(id:string){
    this.cartService.deleteProduct(id);
    this.toastr.error('¡Producto eliminado con éxito!','Producto eliminado.',
    {
      positionClass: 'toast-bottom-right',
      closeButton: true,
      newestOnTop: true,
    });

    console.log("Producto eliminado del carrito");
  }

}
