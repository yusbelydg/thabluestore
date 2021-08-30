import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import { MyValidators } from './../../../utils/validators';

import { ProductsService } from './../../../core/services/products/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form!: FormGroup;
  image$!: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
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

      this.productsService.createProduct(product)
      .subscribe(newProduct => {
        console.log(`Product created: ${newProduct}`);
        this.router.navigate(['./admin/products']) // Direccionamiento a admin/products
      });
    }

    console.log(this.form.value) // Aqui llegan los datos enviados desde el formulario con (ngSubmit), a su vez (ngSubmit) esta relacionado directamente con el boton de submit "Guardar"
  }

  get priceField() {
    return this.form.get('price');
  }

  uploadFile(event:Event) {
    //const file = event.target.files[0];
    const target = (event.target as HTMLInputElement) ;
    const file = (target.files as FileList)[0];

    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file); // Es un observable que tarde en subir

    task.snapshotChanges() // Nos permite ver cuado finaliza o no la tarea task
    .pipe( // Como es un observable puedo procesarlo con un PIPE para que me notifique cuando finaliza
      finalize(() => { // Me avisa cuando finaliza todo el proceso
        this.image$ = fileRef.getDownloadURL()
        this.image$.subscribe( url => {
          console.log(url);
          this.form.get('image')?.setValue(url);
        });
      }) 
    )
    .subscribe(); // Debo hacer una subscripcion para que todo esto se procese
  }

}