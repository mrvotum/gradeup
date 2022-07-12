import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CardComponent } from './card/card.component';
import { CardPanelComponent } from './card-panel/card-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CardComponent,
    CardPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
