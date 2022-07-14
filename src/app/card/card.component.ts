import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { TestReaderService } from '../test-reader.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [ CardService, TestReaderService ]
})
export class CardComponent implements OnInit {
  testDB: any = null;
  questionsArr: any = null;

  constructor(
    public service: CardService,
    private serviceReader: TestReaderService
    ) { }

  ngOnInit(): void {
    document.querySelector('body')?.classList.add('test-started');

    this.serviceReader.getJSON().subscribe(data => {
      this.testDB = data;
    });
  }

  createId(idName: String, i: Number, j: Number, k?: Number) {
    const lastSymbol = k ? `-${k}` : '';

    return `${idName}-${i}-${j}${lastSymbol}`;
  }

  setAttributes(attrName: String, qstCount: Number) {
    const allQuestionsCount = document.getElementsByClassName('card').length;
    let attrResult = null;

    switch (attrName) {
      case 'first':
      case 'current':
        attrResult = qstCount == 1 ? true : false;
        break;
      case 'last':
        attrResult = qstCount == allQuestionsCount ? true : false;
        break;
    }

    return attrResult;
  }

  unlockNextQuestion(nextQuestionIs: Number, islastQuestion: Boolean){
    console.log('click to label');
    console.log(`Следующий вопрос: ${nextQuestionIs}; Он последний? -> ${islastQuestion}`);

    // this.service.progressInfo.currentQuestion = Number(nextQuestionIs) - 1;

    // console.log(`Текущи вопрос ${this.service.progressInfo.currentQuestion}`);

    this.service.testKek();

    this.service.disabled.next = false;

    // this.service.myCustomFunction();
 }

}
