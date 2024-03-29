import { Injectable } from '@angular/core';

interface LevelGrade {
  levelName: string,
  // imgUrl: string,
  alt: string
}
@Injectable({
  providedIn: 'root',
})
export class CardService {
  statistic: any = [];

  activePreloader = true;

  // Тут будет информация о том, какие вопросы уже пройдены
  questionsAnswered: any = [];

  isQuizStartedState = true;

  quizeFisrtInit = true;

  progressInfo = {
    // прогрес-бар: вопросов с ответами
    answeredQuestionWidth: 'width: 00%',
    // прогрес-бар: текущий вопрос
    currentQuestionWidth: 'width: 0%',
    // подсказка прогрес-бара: текущий вопрос
    currentQuestionLeft: 'left: 0%',
    // Номер вопроса на котором мы сейчас находимся (лежит в attr 'data-question-holder')
    currentQuestion: 1,
    // На сколько вопросов ответили
    unlockedQuestionsCount: 1,
    // Сколько вопросов в тесте всего
    questionsCount: 1,
    // Сколько можно набрать в тесте баллов всего
    maxScore: 0,
    // Сколько баллов набрано
    totalScore: 0,
    // Какой выявлен уровень
    grade: 'beginner',
  };

  levelGrade: LevelGrade = {
    levelName: 'Beginner',
    // imgUrl: '/assets/images/dude-beginner.png',
    alt: 'Beginner',
  };

  levelData = {
    beginner: {
      levelName: 'Beginner',
      // imgUrl: '/assets/images/dude-beginner.png',
      alt: 'Beginner',
    },
    junior: {
      levelName: 'Junior designer',
      // imgUrl: '/assets/images/dude-junior.png',
      alt: 'Junior',
    },
    middle: {
      levelName: 'Middle designer',
      // imgUrl: '/assets/images/dude-middle.png',
      alt: 'Middle',
    },
    senior: {
      levelName: 'Senior designer',
      // imgUrl: '/assets/images/dude-senior.png',
      alt: 'Senior',
    },
    lead: {
      levelName: 'Lead designer',
      // imgUrl: '/assets/images/dude-lead.png',
      alt: 'Lead',
    },
  };

  // Блокировка кнопок перехода
  disabled = {
    prev: true,
    next: true,
  };

  testDB: any = [];

  // Передаём сюда информацию, которую необходимо найти
  testCookie(name: string) {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    let searchedInfo = '';

    for ( let i = 0; i < ca.length; i++ ) {
      let c = ca[i];

      while (c.charAt(0) == ' ') c = c.substring(1, c.length);

      if (c.indexOf(nameEQ) == 0) {
        searchedInfo = c.substring(nameEQ.length, c.length);
      }

    }

    return searchedInfo;
  }

  // Обнулить все значения
  cleanVaribles() {
    // Тут будет информация о том, какие вопросы уже пройдены
    this.questionsAnswered = [];
    this.statistic = [];

    this.progressInfo = {
      // прогрес-бар: вопросов с ответами
      answeredQuestionWidth: 'width: 00%',
      // прогрес-бар: текущий вопрос
      currentQuestionWidth: 'width: 0%',
      // подсказка прогрес-бара: текущий вопрос
      currentQuestionLeft: 'left: 0%',
      // Номер вопроса на котором мы сейчас находимся (лежит в attr 'data-question-holder')
      currentQuestion: 1,
      // На сколько вопросов ответили
      unlockedQuestionsCount: 1,
      // Сколько вопросов в тесте всего
      questionsCount: 1,
      // Сколько можно набрать в тесте баллов всего
      maxScore: 0,
      // Сколько баллов набрано
      totalScore: 0,
      // Какой выявлен уровень
      grade: 'beginner',
    };

    this.levelGrade = {
      levelName: 'Beginner',
      // imgUrl: '/assets/images/dude-beginner.png',
      alt: 'Beginner',
    };
  }
}
