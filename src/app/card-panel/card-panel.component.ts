import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.scss'],
  providers: [ CardService ]
})
export class CardPanelComponent implements OnInit {
  cards = document.querySelectorAll('.card');
  cardsParent = document.getElementsByClassName('card__content--answers');

  questions = document.getElementsByClassName('card');
  questionsCountPercent: Number = 0;
  currentQuestionPercent: Number = 1;

  isQuizStarted = false;
  isFirstSearch = true;

  constructor(public service: CardService) { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.querySelector('body.test-started')) {
        this.isQuizStarted = !this.isQuizStarted;

        if (!document.querySelector('body--results')) {
          setTimeout(() => {
            this.service.progressInfo.questionsCount = this.questions.length;

            this.convertCountToPercent();
          }, 100);
        }
      }
    });
  }

  unlockNextQuestion() {

  }

  startQuiz() {
    this.isQuizStarted = !this.isQuizStarted;

    if (!document.querySelector('body--results')) {
      setTimeout(() => {
        this.questions = document.getElementsByClassName('card');
        this.service.progressInfo.questionsCount = this.questions.length;

          this.convertCountToPercent();
      }, 100);
    }
  }

  showResults() {
    console.log('calculating');
    document.querySelector('body')?.classList.add('body--results');
  }

  convertCountToPercent() {
    this.questionsCountPercent = this.service.progressInfo.questionsCount;
    this.currentQuestionPercent = Number(this.service.progressInfo.currentQuestion) * 100 / Number(this.service.progressInfo.questionsCount);

    this.service.progressInfo.currentQuestionWidth = `width: ${this.currentQuestionPercent}%`;
    this.service.progressInfo.currentQuestionLeft = `left: ${this.currentQuestionPercent}%`;
  }

  changeQuestion(isNext: boolean) {

    // this.service.testKek();
    // this.service.changeTestKek('lololololololo');
    // this.service.testKek();

    if (this.isFirstSearch) {
      this.cards = document.querySelectorAll('.card');
      this.isFirstSearch = !this.isFirstSearch;
    }

    for (let i = 0; i < this.cards.length; i++) {
      const element = this.cards[i];

      if (element.getAttribute('data-current') == 'true') {
        if (isNext) {
          this.service.disabled.prev = false;
          this.service.disabled.next = true;

          // this.service.myCustomFunction();

          this.service.progressInfo.currentQuestion = Number(element.getAttribute('data-question-holder')) + 1;
        } else {
          this.service.progressInfo.currentQuestion = Number(element.getAttribute('data-question-holder')) - 1;
        }

        const nextQuestion = document.querySelector(`[data-question-holder='${this.service.progressInfo.currentQuestion}']`);

        if (nextQuestion) {
          element.setAttribute('data-current', 'false');
          element.classList.add('card--hidden');

          nextQuestion?.classList.remove('card--hidden');
          nextQuestion?.setAttribute('data-current', 'true');

          if (!isNext && nextQuestion.getAttribute('data-first') == 'true') {
            this.service.disabled.prev = true;
          }

          if (nextQuestion?.getAttribute('data-last') == 'true') {
            // Показываем кнопку с результатами
            document.querySelector('.btn--next')?.classList.add('btn--hidden');
            document.querySelector('.btn--results')?.classList.remove('btn--hidden');
          } else if (!isNext && element.getAttribute('data-last') == 'true') {
            // Шагаем назад, значит снова прячем кнопку с результатами
            document.querySelector('.btn--next')?.classList.remove('btn--hidden');
            document.querySelector('.btn--results')?.classList.add('btn--hidden');
          }

        } else {
          console.error(`Вопрос под номером '${this.service.progressInfo.currentQuestion}' не найден`);

          // И возвращаем счётчик обратно
          this.service.progressInfo.currentQuestion = Number(element.getAttribute('data-question-holder'));
        }

        this.service.testKek();
        console.log(`Текущий вопрос#2 - ${this.service.progressInfo.currentQuestion}`);

        this.convertCountToPercent();
        return;
      }
    }
  }
}
