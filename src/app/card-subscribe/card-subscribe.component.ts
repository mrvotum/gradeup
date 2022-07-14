import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-subscribe',
  templateUrl: './card-subscribe.component.html',
  styleUrls: ['./card-subscribe.component.scss'],
  providers: [ CardService ]
})
export class CardSubscribeComponent implements OnInit {

  constructor(public service: CardService) { }

  ngOnInit(): void {
  }

  showText() {
    // Показываем эту переменную из сервиса
    this.service.testKek();
  }

}
