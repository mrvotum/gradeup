import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
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
  // fisrtInit = true;
  showResultBtn = false;
  showNextBtn = true;

  constructor(public service: CardService) { }

  ngOnInit(): void {
    this.service.cleanVaribles();
  }

  ngDoCheck() {
    if (this.service.quizeFisrtInit) {
      const questions = document.getElementsByClassName('card');

      if (questions.length > 0 && document.querySelector('body.test-started')) {
        this.service.quizeFisrtInit = false;
        // this.service.progressInfo.questionsCount = questions.length;

        this.startQuiz();

        // Добавляем возможность перехода к следующему вопросу по нажатию на Enter
        document.addEventListener( 'keyup', event => {
          if( event.keyCode === 13 && !this.service.disabled.next ) this.changeQuestion(true);
        });
      }
    }
  }

  unlockNextQuestion() { }

  randomInfo() {
    document.querySelector('body')?.classList.add('body--results');
    this.service.isQuizStartedState = false;
    this.service.activePreloader = true;

    this.service.progressInfo.maxScore = 140;
    this.service.progressInfo.totalScore = 86;

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
    // if (!document.querySelector('body--results')) {
      this.isQuizStarted = true;
      this.service.isQuizStartedState = true;

      this.service.progressInfo.questionsCount = this.questions.length;
      const questionsAnswered: any = {};

      for (let i = 0; i < this.questions.length; i++) {
        questionsAnswered[`questionN${i + 1}`] = false;
      }

      this.service.questionsAnswered.push(questionsAnswered);

      this.convertCountToPercent();

      const preloader = document.querySelector('.simple-preloader#preloader');
      preloader?.classList.add('hide');
      setTimeout(() => {
        preloader?.remove();
        this.service.activePreloader = false;
      }, 400);
    // }
  }

  showResults() {
    const questionsBlocks = document.querySelectorAll('.questions-block');
    this.service.isQuizStartedState = false;
    this.service.quizeFisrtInit = true;
    this.service.activePreloader = true;

    const radioBtns = document.querySelectorAll('input[type="radio"]:checked');
		let totalScore = 0;

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
				totalScore = totalScore + Number(element.getAttribute('value'));
			});

			this.service.progressInfo.maxScore = radioBtns.length * 4;

      this.convertToPoints(totalScore);
		} else {
			console.error('Не получилось найти отмеченные вопросы');
			return;
		}

    document.querySelector('body')?.classList.add('body--results');
    // Тест пройден, даём об этом знать кукам
    document.cookie = 'testDone=true';
  }

  convertToPoints(totalScore: Number) {
    const scoreInPoints = Number(totalScore) * 500 / this.service.progressInfo.maxScore;
    const scoreInPercent = Number(totalScore) * 100 / this.service.progressInfo.maxScore;

    this.service.progressInfo.totalScore = Math.round(scoreInPoints);

    if (scoreInPercent < 20) {
      this.service.levelGrade = this.service.levelData.beginner;
    } else if (scoreInPercent > 21 && scoreInPercent < 40) {
      this.service.levelGrade = this.service.levelData.junior;
    } else if (scoreInPercent > 41 && scoreInPercent < 60) {
      this.service.levelGrade = this.service.levelData.middle;
    } else if (scoreInPercent > 61 && scoreInPercent < 80) {
      this.service.levelGrade = this.service.levelData.senior;
    } else if (scoreInPercent > 81) {
      this.service.levelGrade = this.service.levelData.lead;
    }

    this.setCookiesLeveGrade();
    // console.log(document.cookie);
  }

  setCookiesLeveGrade() {
    // Добавляем в куки результаты из шапки карточки результатов
    Object.entries(this.service.levelGrade).forEach(([key, value]) => {
      document.cookie = `${key}=${value}`;
    });
    // Добавляем в куки итоговые баллы из шапки карточки результатов
    document.cookie = `totalScore=${this.service.progressInfo.totalScore}`;
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
            this.showResultBtn = !this.showResultBtn;
            this.showNextBtn = !this.showNextBtn;
          } else if (!isNext && element.getAttribute('data-last') == 'true') {
            // Шагаем назад, значит снова прячем кнопку с результатами
            this.showResultBtn = !this.showResultBtn;
            this.showNextBtn = !this.showNextBtn;
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
