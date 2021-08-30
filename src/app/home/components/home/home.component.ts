import { Component, OnInit, AfterViewInit } from '@angular/core';

import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  mySwiper!: Swiper;

  imageRecomendeds = [
    'assets/images/pngfind.com-crop-top.png',
    'assets/images/pngfind.com-eat-sleep.png',
    'assets/images/pngfind.com-skittles-bag.png',
    'assets/images/pngfind.com-skittles-bag-.png',
    'assets/images/pngfind.com-sweater.png',
    'assets/images/pngfind.com-twerk.png',
    'assets/images/pngfind.com-women-bag.png',
    'assets/images/pngfind.com-women-bag-png.png'
  ]

  /*imageRecomendeds = [
    'assets/images/camiseta.png',
    'assets/images/hoodie.png',
    'assets/images/mug.png',
    'assets/images/pin.png',
    'assets/images/ecommerce1.png',
    'assets/images/stickers1.png',
    'assets/images/stickers2.png',
    'assets/images/ecommerce2.png',
  ]*/

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() { // Metodo del cliclo de vida Angular
    this.mySwiper = new Swiper('.swiper-container');
  }

}
