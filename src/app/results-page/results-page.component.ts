import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
  providers: [ CardService ]
})
export class ResultsPageComponent implements OnInit {
  constructor(public service: CardService) { }

  ngOnInit(): void {
    document.querySelector('body')?.classList.add('body--results');
  }

  lol() {
    console.log('=================');
    // Меняем переменную в сервисе
    this.service.changeTestKek('New message from result-page');
    // Показываем эту переменную из сервиса
    this.service.testKek();
  }
}
