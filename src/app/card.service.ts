import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  progressInfo = {
    // прогрес-бар: вопросов с ответами
    answeredQuestionWidth: 'width: 100%',
    // прогрес-бар: текущий вопрос
    currentQuestionWidth: 'width: 0%',
    // подсказка прогрес-бара: текущий вопрос
    currentQuestionLeft: 'left: 0%',
    // Номер вопроса на котором мы сейчас находимся (лежит в attr 'data-question-holder')
    currentQuestion: 1,
    // На сколько вопросов ответили
    unlockedQuestionsCount: '',
    // Сколько вопросов в тесте всего
    questionsCount: 0,
  };

  // Блокировка кнопок перехода
  disabled = {
    prev: true,
    next: true
  };



  constructor() { }

  myCustomFunction() {
    const kek = document.getElementById('btn--next');

    if (kek?.getAttribute('disabled') && this.disabled.next === false) {
      kek?.removeAttribute('disabled')
    } else {
      kek?.setAttribute('disabled', 'disabled');
    }
  }





  lolKek: String = 'This is old varriable in service';

  testKek() {
    console.log(this.lolKek);
    // console.log(`Текущий вопрос ${this.progressInfo.currentQuestion}`);
  }

  changeTestKek(message: String) {
    this.lolKek = message;
  }
}
