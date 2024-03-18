import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelGameComponent } from './label-game/label-game.component';
import { MatchingGameComponent } from './matching-game/matching-game.component';

const routes: Routes = [
  { path: 'column-game', component: MatchingGameComponent },
  { path: 'label-game', component: LabelGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
