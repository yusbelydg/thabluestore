import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidators } from './../../../utils/validators';

import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})

export class ProductEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activedRouted: ActivatedRoute
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.activedRouted.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id).
      subscribe(product => {
        this.form.patchValue(product); // Inyecta el producto, y con eso lo llena
      });
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]]
    })
  }

  saveProduct(event: Event) {
    event.preventDefault(); // Por buena practica con esto le decimos al evento que evite su comportamiendo por default de enviar el formulario y recargar la pagina, por lo que le decimos con esto que mejor haga el que nosotros indicamos
                            // Evitamos renderizaciones incorrectas
    
    if (this.form.valid) {
      const product = this.form.value;

      this.productsService.updateProduct(this.id, product)
      .subscribe(newProduct => {
        console.log(`Product updated: ${newProduct}`);
        this.router.navigate(['./admin/products']) // Direccionamiento a admin/products
      });
    }

    console.log(this.form.value) // Aqui llegan los datos enviados desde el formulario con (ngSubmit), a su vez (ngSubmit) esta relacionado directamente con el boton de submit "Guardar"
  }

  get priceField() {
    return this.form.get('price');
  }

}

