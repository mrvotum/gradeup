import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  statistic: any = [];

  activePreloader = true;

  // Тут будет информация о том, какие вопросы уже пройдены
  questionsAnswered: any = [];

  isQuizStartedState = false;
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
    grade: 'beginner'
  };

  levelGrade = {
    levelName: 'Beginner',
    imgUrl: '/assets/images/dude-beginner.png',
    alt: 'Beginner dude'
  };

  levelData = {
    beginner: {
      levelName: 'Beginner',
      imgUrl: '/assets/images/dude-beginner.png',
      alt: 'Beginner stone'
    },
    junior: {
      levelName: 'Junior designer',
      imgUrl: '/assets/images/dude-junior.png',
      alt: 'Junior dude'
    },
    middle: {
      levelName: 'Middle designer',
      imgUrl: '/assets/images/dude-middle.png',
      alt: 'Middle dude'
    },
    senior: {
      levelName: 'Senior designer',
      imgUrl: '/assets/images/dude-senior.png',
      alt: 'Senior dude'
    },
    lead: {
      levelName: 'Lead designer',
      imgUrl: '/assets/images/dude-lead.png',
      alt: 'Lead dude'
    }
  }

  // Блокировка кнопок перехода
  disabled = {
    prev: true,
    next: true
  };

  testDB: any = [];

  constructor() { }

  // Обнулить все значения
  cleanVaribles() {
    // Тут будет информация о том, какие вопросы уже пройдены
    this.questionsAnswered = [];

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
      grade: 'beginner'
    };

    this.levelGrade = {
      levelName: 'Beginner',
      imgUrl: '/assets/images/dude-beginner.png',
      alt: 'Beginner dude'
    };
  }
}
