import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Swiper } from'swiper/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  images: string[] = [
    'assets/images/banner-1.jpg',
    'assets/images/banner-2.jpg',
    'assets/images/banner-3.jpg'
  ];

  mySwiper!: Swiper;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    SwiperCore.use([Navigation, Pagination]);
    
    this.mySwiper = new Swiper(".swiper-container", {
      /*pagination: {
        el: '.swiper-pagination',
      },*/
      navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
      }
    });
  }

}
