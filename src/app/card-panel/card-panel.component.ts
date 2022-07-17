import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.scss'],
  // providers: [ CardService ]
})
export class CardPanelComponent implements OnInit {
  cards = document.querySelectorAll('.card');
  cardsParent = document.getElementsByClassName('card__content--answers');

  questions = document.getElementsByClassName('card');
  questionsCountPercent: Number = 0;
  currentQuestionPercent: Number = 1;
  answeredQuestions: Number = 1;

  isQuizStarted = false;
  isFirstSearch = true;
  fisrtInit = true;

  constructor(public service: CardService) { }

  ngOnInit(): void {
    // document.addEventListener('DOMContentLoaded', () => {
    //   if (document.querySelector('body.test-started')) {
    //     this.startQuiz();

        // Пока только для отладки
        document.addEventListener( 'keyup', event => {
          if( event.keyCode === 13 ) this.changeQuestion(true);
        });
    //   }
    // });
  }

  ngDoCheck() {
    if (this.fisrtInit) {
      const questions = document.getElementsByClassName('card');

      if (questions.length > 0 && document.querySelector('body.test-started')) {
        this.fisrtInit = false;
        // this.service.progressInfo.questionsCount = questions.length;

        this.startQuiz();
      }
    }
  }

  unlockNextQuestion() { }

  randomInfo() {
    document.querySelector('body')?.classList.add('body--results');

    this.service.progressInfo.maxScore = 140;
    this.service.progressInfo.totalScrore = 86;

    this.service.statistic = [
      {
        categoryMaxScore: 12,
        categoryTotalScore: 12,
        categoryResWidth: `width: ${12 * 100 / 12}%`
      }, {
        categoryMaxScore: 16,
        categoryTotalScore: 9,
        categoryResWidth: `width: ${9 * 100 / 16}%`
      }, {
        categoryMaxScore: 12,
        categoryTotalScore: 9,
        categoryResWidth: `width: ${9 * 100 / 12}%`
      }, {
        categoryMaxScore: 16,
        categoryTotalScore: 14,
        categoryResWidth: `width: ${14 * 100 / 16}%`
      }, {
        categoryMaxScore: 28,
        categoryTotalScore: 13,
        categoryResWidth: `width: ${13 * 100 / 28}%`
      }, {
        categoryMaxScore: 16,
        categoryTotalScore: 5,
        categoryResWidth: `width: ${5 * 100 / 16}%`
      }, {
        categoryMaxScore: 8,
        categoryTotalScore: 4,
        categoryResWidth: `width: ${4 *100  / 8}%`
      }, {
        categoryMaxScore: 8,
        categoryTotalScore: 5,
        categoryResWidth: `width: ${5 *100  / 8}%`
      }, {
        categoryMaxScore: 12,
        categoryTotalScore: 5,
        categoryResWidth: `width: ${5 * 100 / 12}%`
      }, {
        categoryMaxScore: 12,
        categoryTotalScore: 10,
        categoryResWidth: `width: ${10 * 100 / 12}%`
      }
    ];
  }

  startQuiz() {
    if (!document.querySelector('body--results')) {
      this.isQuizStarted = true;

      this.service.progressInfo.questionsCount = this.questions.length;
      const questionsAnswered: any = {};

      for (let i = 0; i < this.questions.length; i++) {
        questionsAnswered[`questionN${i + 1}`] = false;
      }

      this.service.questionsAnswered.push(questionsAnswered);

      this.convertCountToPercent();
    }
  }

  showResults() {
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
        categoryInfo['categoryMaxScore'] = element.length * 4;
        categoryInfo['categoryTotalScore'] = categoryScore;
        // Переводим результат в проценты
        categoryInfo['categoryResWidth'] = `width: ${(categoryScore * 100) / (element.length * 4)}%`;

        this.service.statistic.push(categoryInfo);
			}

			radioBtns.forEach(element => {
				maxScore = maxScore + Number(element.getAttribute('value'));
			});

			this.service.statistic.maxScore = radioBtns.length * 4;
			this.service.statistic.totalScrore = radioBtns.length * 4;
		} else {
			console.error('Не получилось найти отмеченные вопросы');
			return;
		}

    document.querySelector('body')?.classList.add('body--results');
  }

  convertCountToPercent() {
    this.questionsCountPercent = this.service.progressInfo.questionsCount;
    this.currentQuestionPercent = Number(this.service.progressInfo.currentQuestion) * 100 / Number(this.service.progressInfo.questionsCount);
    this.answeredQuestions = Number(this.service.progressInfo.unlockedQuestionsCount) * 100 / Number(this.service.progressInfo.questionsCount);

    this.service.progressInfo.answeredQuestionWidth = `width: ${this.answeredQuestions}%`;
    this.service.progressInfo.currentQuestionWidth = `width: ${this.currentQuestionPercent}%`;
    this.service.progressInfo.currentQuestionLeft = `left: ${this.currentQuestionPercent}%`;
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
          this.service.disabled.prev = false;

          this.service.progressInfo.currentQuestion = Number(element.getAttribute('data-question-holder')) + 1;

          // При шаге вперёд проверяем, отвечен ли текущий вопрос, чтобы блокировать или не блокировать кнопку
          if (this.service.questionsAnswered[0][`questionN${i+2}`] == false) {
            this.service.disabled.next = true;
          }
        } else {
          this.service.progressInfo.currentQuestion = Number(element.getAttribute('data-question-holder')) - 1;

          // При шаге назад проверяем, отвечен ли текущий вопрос, чтобы блокировать или не блокировать кнопку
          if (this.service.questionsAnswered[0][`questionN${i+2}`] == false) {
            this.service.disabled.next = false;
          }
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

        this.convertCountToPercent();
        return;
      }
    }
  }
}
