import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  imagesRedes = [
    'assets/images/twitter.png',
    'assets/images/facebook.png',
    'assets/images/instagram.png'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
