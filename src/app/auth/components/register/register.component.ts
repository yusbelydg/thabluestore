import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-registry',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  registerInFireBaseSuccess! : Boolean;
  registerInFireBaseMessage!: String;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      birthDate: ['',[Validators.required]],
      sex: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email, Validators.minLength(8)]],
      password: ['',[Validators.required, Validators.minLength(8)]] // Validators.minLength(8)
    })
  }

  register(event: Event) {
    event.preventDefault();

    //debugger;
    if (this.form.valid) { // No se esta pidiendo confirmacion de password en este caso
      const registerValues = this.form.value; // Gusrdo en register lo valores actuales de mi formulario
      this.authService.createUser(registerValues.email, registerValues.password)
      .then( (registerResult) => {
        this.registerInFireBaseSuccess = true;
        this.registerInFireBaseMessage = '' ;
        this.router.navigate(['auth/login']);
        console.log('Registro de usuario Exitoso.')
        }
      )
      .catch(error => {
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.registerInFireBaseSuccess = false;
            this.registerInFireBaseMessage = 'Este Email ya fue registrado, intente con otro.';
            console.log(`Error de registro de usuario: ${error.code}`);
            break;

          case 'auth/invalid-email':
            this.registerInFireBaseSuccess = false;
            this.registerInFireBaseMessage = 'Email inválido, por favor revise el correo que acaba de agregar.';
            console.log(`Error de registro de usuario: ${error.code}`);
            break;

          default:
            this.registerInFireBaseSuccess = false;
            this.registerInFireBaseMessage = 'Error, intente de nuevo.';
            console.log(`Error de registro de usuario: ${error.code}`);
            break;
        }

      });
      // console.log(register );
      console.log('Register result ${registerValues}' );
    }
  }

  get nameField() {
    return this.form.get('name'); //obtengo el resultado de la validacion del campo name en form
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get birthDateField() {
    return this.form.get('birthDate');
  }

  get sexField() {
    return this.form.get('sex');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }



}
