import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchingGameComponent } from './matching-game/matching-game.component';
import { LabelGameComponent } from './label-game/label-game.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchingGameComponent,
    LabelGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
