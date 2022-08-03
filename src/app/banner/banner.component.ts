import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  showBanner: Boolean = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showBanner = true;
    }, 5000);
  }

  hideBunner() {
    this.showBanner = false;
  }

}
