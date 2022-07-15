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

  statistic: any = [];

  // Для теста пока так
  // statistic: any = [
  //   {
  //     categorMaxScore1: 12,
  //     category1: 10,
  //   }, {
  //     categorMaxScore2: 12,
  //     category2: 6,
  //   }
  // ];

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

        // Пока только для отладки
        document.addEventListener( 'keyup', event => {
          if( event.keyCode === 13 ) this.changeQuestion(true);
        });
      }
    });
  }

  unlockNextQuestion() {

  }

  randomInfo() {
    document.querySelector('body')?.classList.add('body--results');

    this.statistic = [
      {
        categorMaxScore: 12,
        category: 10,
        categoryResWidth: `width: ${10 * 100 / 12}%`
      }, {
        categorMaxScore: 12,
        category: 6,
        categoryResWidth: `width: ${6 * 12 / 3}%`
      }
    ];

    console.log(this.statistic);
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

    const questionsBlocks = document.querySelectorAll('.questions-block');

    const radioBtns = document.querySelectorAll('input[type="radio"]:checked');
		let maxScore = 0;

		if (radioBtns) {
			for (let i = 0; i < questionsBlocks.length; i++) {
				const element = document.querySelectorAll(`input[type="radio"][data-questions-block="${i + 1}"]:checked`);
				let categoryScore = 0;

				element.forEach(el => {
					categoryScore = categoryScore + Number(el.getAttribute('value'));
				});

        // Объект, куда записывается статистика по ответам блока вопросов
        const categoryInfo: any = {};
        categoryInfo['categorMaxScore'] = element.length * 4;
        categoryInfo['categoryTotalScore'] = categoryScore;
        // Переводим результат в проценты
        categoryInfo['categoryResWidth'] = `width: ${(categoryScore * 100) / (element.length * 4)}%`;

        this.statistic.push(categoryInfo);
			}

			radioBtns.forEach(element => {
				maxScore = maxScore + Number(element.getAttribute('value'));
			});

			this.statistic.maxScore = radioBtns.length * 4;
		} else {
			console.error('Не получилось найти отмеченные вопросы');
			return;
		}

    console.log(this.statistic);

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
