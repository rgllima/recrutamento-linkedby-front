import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
})
export class CarouselComponent implements OnInit {
  images = [
    'https://img.wine.com.br/cdn-cgi/image/q=99,f=auto,h=300/banner/wine/destaque/destaque-harmoniza-brasil-clube-24-04-desktop.jpg?99',
    'https://img.wine.com.br/cdn-cgi/image/q=99,f=auto,h=300/banner/wine/destaque/destaque-kits-bbb-20-04-desktop.jpg',
    'https://img.wine.com.br/cdn-cgi/image/q=99,f=auto,h=300/banner/wine/destaque/destaque-harmoniza-brasil-23-04-desktop.jpg'
  ];

  constructor() {}

  ngOnInit(): void {}
}
