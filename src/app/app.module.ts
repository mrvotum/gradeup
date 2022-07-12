import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CardComponent } from './card/card.component';
import { CardPanelComponent } from './card-panel/card-panel.component';
import { CardSubscribeComponent } from './card-subscribe/card-subscribe.component';
import { CardInstructionComponent } from './card-instruction/card-instruction.component';
import { ResultsPageComponent } from './results-page/results-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CardComponent,
    CardPanelComponent,
    CardSubscribeComponent,
    CardInstructionComponent,
    ResultsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
