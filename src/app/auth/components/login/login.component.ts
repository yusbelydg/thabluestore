import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  form!: FormGroup;

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
      email: ['', [Validators.required] ],
      password: ['', [Validators.required]]
    })
  }

  login(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const loginValues = this.form.value;

      this.authService.login(loginValues.email, loginValues.password)
      .then(() => { // Si todo correcto
        this.router.navigate(['/admin/dashboard'])
      })
      .catch((error) => { // Si hay algun error
        
        if (error.code === 'auth/user-not-found') {
          console.log(`Error de autenticación: ${error.code}`);
          alert('Este email no se encuentra registrado, por favor intente de nuevo.');
        } else {
          console.log(`Error de autenticación: ${error.code}`);
          alert('Email inválido');
        }
      });
      console.log('Register result ${loginValues}' );

      /*this.userService.loginUser(login)
      .subscribe(loginResult => {
        console.log(`User Logged: ${loginResult}`);
        this.router.navigate(['/home']);

      });*/
    }

  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

}
