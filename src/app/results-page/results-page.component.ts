import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent implements OnInit {
  ngOnInit(): void {
    document.querySelector('body')?.classList.add('body--results');
    document.querySelector('body')?.classList.remove('start-page');
  }
}
