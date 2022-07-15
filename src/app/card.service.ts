import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  statistic: any = [];

  // Тут будет информация о том, какие вопросы уже пройдены
  questionsAnswered: any = [];

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
    questionsCount: 1
  };

  // Блокировка кнопок перехода
  disabled = {
    prev: true,
    next: true
  };



  constructor() { }

  // myCustomFunction() {
  //   const kek = document.getElementById('btn--next');

  //   if (kek?.getAttribute('disabled') && this.disabled.next === false) {
  //     kek?.removeAttribute('disabled')
  //   } else {
  //     kek?.setAttribute('disabled', 'disabled');
  //   }
  // }





  public lolKek: String = 'This is old varriable in service';

  showTestKek() {
    console.log('=================SERVICE=================');
    console.log(this.lolKek);
    console.log('=================SERVICE=================');
  }

  changeTestKek(message: String) {
    this.lolKek = message;
  }
}
