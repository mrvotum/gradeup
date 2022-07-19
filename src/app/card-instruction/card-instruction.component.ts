import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-instruction',
  templateUrl: './card-instruction.component.html',
  styleUrls: ['./card-instruction.component.scss']
})
export class CardInstructionComponent implements OnInit {

  constructor(public service: CardService) { }

  ngOnInit(): void {
    this.service.isQuizStartedState = false;
  }

}
