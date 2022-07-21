import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CardService } from '../card.service';
import { TestReaderService } from '../test-reader.service';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-card-result',
  templateUrl: './card-result.component.html',
  styleUrls: ['./card-result.component.scss'],
  providers: [ TestReaderService ]
})
export class CardResultComponent implements OnInit {
  testDB: any = null;
  accordionIsOpen: boolean = false;

  constructor(
    public service: CardService,
    private serviceReader: TestReaderService
    ) { }

  ngOnInit(): void {
    this.serviceReader.getJSON().subscribe(data => {
      this.testDB = data;
      this.service.testDB = data;
    });

    // Проверяем, есть ли на странице пройденные результаты
    const checkCookie = this.service.testCookie('testDone');
    if (checkCookie == 'true') {
      // Куки есть и переход по прямой ссылке
      this.service.levelGrade.levelName = this.service.testCookie('levelName');
      this.service.levelGrade.imgUrl = this.service.testCookie('imgUrl');
      this.service.levelGrade.alt = this.service.testCookie('alt');
      this.service.progressInfo.totalScore = Number(this.service.testCookie('totalScore'));
    }
  }

  @ViewChild('content', { static: true }) el!: ElementRef<HTMLImageElement>;

  exportImgResult() {
    this.changeCardView();

    html2canvas(this.el.nativeElement).then(canvas => {
      const linkHolder = document.getElementById('link-holder');

      var link = document.createElement('a');
      linkHolder?.appendChild(link);
      link.download = 'your level.jpg';
      link.href = canvas.toDataURL();
      link.target = '_blank';
      link.click();
    });

    this.changeCardView();
  }

  changeCardView() {
    const cardFooter = document.querySelector('.card__footer');

    if (cardFooter?.classList.contains('card__footer--print-v')) {
      cardFooter?.classList.remove('card__footer--print-v');
    } else {
      cardFooter?.classList.add('card__footer--print-v');
    }
  }

  accordionToggle() {
    this.accordionIsOpen = !this.accordionIsOpen;
  }
}
