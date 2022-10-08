import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { CardInstructionComponent } from './card-instruction/card-instruction.component';
import { CardComponent } from './card/card.component';
import { ResultsPageComponent } from './results-page/results-page.component';

const routes: Routes = [
  { path: '', component: CardInstructionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'questions', component: CardComponent },
  { path: 'results', component: ResultsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
