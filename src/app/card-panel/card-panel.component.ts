import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.scss']
})
export class CardPanelComponent implements OnInit {
  cards = document.querySelectorAll('.card');
  isQuizStarted = false;
  isFirstSearch = true;

  constructor() { }

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.querySelector('body.test-started')) {
        this.isQuizStarted = !this.isQuizStarted;
      }
    });
  }

  startQuiz() {
    this.isQuizStarted = !this.isQuizStarted;
  }

  showResults() {
    console.log('to results');
    document.querySelector('body')?.classList.add('body--results');
  }

  showPrev() {
    console.log('prev');

    this.changeQuestion(false);
  }

  showNext() {
    console.log('next');

    this.changeQuestion(true);
  }

  changeQuestion(isNext: boolean) {
    if (this.isFirstSearch) {
      this.cards = document.querySelectorAll('.card');
      this.isFirstSearch = !this.isFirstSearch;
    }

    let currentQuestion: number = 0;

    for (let i = 0; i < this.cards.length; i++) {
      const element = this.cards[i];

      if (element.getAttribute('data-current') == 'true') {
        console.log(2);

        if (isNext) {
          currentQuestion = Number(element.getAttribute('data-question-holder')) + 1;
        } else {
          currentQuestion = Number(element.getAttribute('data-question-holder')) - 1;
        }

        const nextQuestion = document.querySelector(`[data-question-holder="${currentQuestion}"]`);

        if (nextQuestion) {
          element.setAttribute('data-current', 'false');
          element.classList.add('card--hidden');

          nextQuestion?.classList.remove('card--hidden');
          nextQuestion?.setAttribute('data-current', 'true');

          console.log(nextQuestion);

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
          console.error(`Вопрос под номером '${currentQuestion}' не найден`);
        }

        return;
      }
    }
  }
}
