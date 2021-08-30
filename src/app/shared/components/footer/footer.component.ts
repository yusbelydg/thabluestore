import { Component, OnInit } from '@angular/core';
import { FormControl, MaxLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailField: FormControl;
  
  constructor() { 
    this.emailField = new FormControl('', 
    [
      Validators.required,
      Validators.email
    ]);

    /*  Lo comentamos porque por ahora no lo necesitamos
    this.emailField.valueChanges
    .subscribe(value => { // Me subscribi a un observable para escuchar cada cambio dinamicamente.
      console.log(value);
    }); 
    */

  }

  ngOnInit(): void {
  }

  sendMail() { 
    if (this.emailField.valid) {
      console.log(this.emailField.value);
    }
  }

}
