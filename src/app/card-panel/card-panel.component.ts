import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.scss']
})
export class CardPanelComponent implements OnInit {
  cards = document.querySelectorAll('.card');

  questions = document.getElementsByClassName('card');
  questionsCount: Number = 0;
  currentQuestion: Number = 1;
  questionsCountPercent: Number = 0;
  currentQuestionPercent: Number = 1;

  progressInfo = {
    answeredQuestionWidth: 'width: 100%',
    currentQuestionWidth: 'width: 0%',
    currentQuestionLeft: 'left: 0%'
  };

  isQuizStarted = false;
  isFirstSearch = true;
  disabled = true;

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.querySelector('body.test-started')) {
        this.isQuizStarted = !this.isQuizStarted;

        if (!document.querySelector('body--results')) {
          this.questionsCount = this.questions.length;

          // this.initProgressBar();
          this.convertCountToPercent();
        }
      }
    });
  }

  startQuiz() {
    this.isQuizStarted = !this.isQuizStarted;

    if (!document.querySelector('body--results')) {
      setTimeout(() => {
        this.questions = document.getElementsByClassName('card');
        this.questionsCount = this.questions.length;

        // this.initProgressBar();
          this.convertCountToPercent();
      }, 100);
    }
  }

  // initProgressBar() {
  //   console.log('keke');
  // }

  showResults() {
    console.log('to results');
    document.querySelector('body')?.classList.add('body--results');
  }

  convertCountToPercent() {
    this.questionsCountPercent = this.questionsCount;
    this.currentQuestionPercent = Number(this.currentQuestion) * 100 / Number(this.questionsCount);

    this.progressInfo.currentQuestionWidth = `width: ${this.currentQuestionPercent}%`;
    this.progressInfo.currentQuestionLeft = `left: ${this.currentQuestionPercent}%`;
  }

  changeQuestion(isNext: boolean) {
    if (this.isFirstSearch) {
      this.cards = document.querySelectorAll('.card');
      this.isFirstSearch = !this.isFirstSearch;
    }

    for (let i = 0; i < this.cards.length; i++) {
      const element = this.cards[i];

      if (element.getAttribute('data-current') == 'true') {
        if (isNext) {
          this.disabled = false;
          this.currentQuestion = Number(element.getAttribute('data-question-holder')) + 1;
        } else {
          this.currentQuestion = Number(element.getAttribute('data-question-holder')) - 1;
        }

        const nextQuestion = document.querySelector(`[data-question-holder='${this.currentQuestion}']`);

        if (nextQuestion) {
          element.setAttribute('data-current', 'false');
          element.classList.add('card--hidden');

          nextQuestion?.classList.remove('card--hidden');
          nextQuestion?.setAttribute('data-current', 'true');

          if (!isNext && nextQuestion.getAttribute('data-first') == 'true') {
            this.disabled = true;
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
          console.error(`Вопрос под номером '${this.currentQuestion}' не найден`);

          // И возвращаем счётчик обратно
          this.currentQuestion = Number(element.getAttribute('data-question-holder'));
        }

        this.convertCountToPercent();
        return;
      }
    }
  }
}
