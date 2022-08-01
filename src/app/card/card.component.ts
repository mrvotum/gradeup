import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { TestReaderService } from '../test-reader.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [ TestReaderService ]
})
export class CardComponent implements OnInit {
  testDB: any = null;
  questionsArr: any = null;
  nextBtn: any = document.getElementById('btn--next');

  constructor(
    public service: CardService,
    private serviceReader: TestReaderService
    ) { }

  ngOnInit(): void {
    const bodyMain = document.querySelector('body');
    bodyMain?.classList.add('test-started');
    if (bodyMain?.classList.contains('body--results')) {
      bodyMain?.classList.remove('body--results');
    }

    this.service.quizeFisrtInit = true;

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

  unlockNextQuestion(currentQuestionIs: Number){
    if (this.service.questionsAnswered[0][`questionN${currentQuestionIs}`] == false) {
      // Указываем следующий шаг прогрессбара
      this.service.progressInfo.unlockedQuestionsCount += 1;
      this.service.questionsAnswered[0][`questionN${currentQuestionIs}`] = true;
      this.service.disabled.next = false;
    }

    this.service.progressInfo.currentQuestion = Number(currentQuestionIs);

    // Костыльно переходим к следующему вопросу
    this.nextBtn = document.getElementById('btn--next');
    setTimeout(() => {
      this.nextBtn?.click();
    }, 200);
 }

}
