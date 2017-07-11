import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DiaryPageComponent } from './diary-page/diary-page.component';
import { HappyCardComponent } from './happy-card/happy-card.component';
import { HappyDetailsCardComponent } from './happy-details-card/happy-details-card.component';
import { OverviewComponent } from './home-page/overview/overview.component';
import { LastDaysComponent } from './home-page/last-days/last-days.component';
import { GratitudesComponent } from './happy-details-card/gratitudes/gratitudes.component';
import { ExerciseComponent } from './happy-details-card/exercise/exercise.component';
import { MeditationComponent } from './happy-details-card/meditation/meditation.component';
import { KindnessComponent } from './happy-details-card/kindness/kindness.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DiaryPageComponent,
    HappyCardComponent,
    HappyDetailsCardComponent,
    OverviewComponent,
    LastDaysComponent,
    GratitudesComponent,
    ExerciseComponent,
    MeditationComponent,
    KindnessComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
