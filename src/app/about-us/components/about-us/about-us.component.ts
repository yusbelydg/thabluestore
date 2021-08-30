import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  image = ["assets/images/ecommerce1.png", "assets/images/ecommerce2.png"];

  constructor() { }

  ngOnInit(): void {
  }

}
