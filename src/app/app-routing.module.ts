import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiaryPageComponent} from "./diary-page/diary-page.component";
import {HappyDetailsCardComponent} from "./happy-details-card/happy-details-card.component";
import {HomePageComponent} from "./home-page/home-page.component";
import { SignupComponent } from 'app/signup/signup.component';
import {NewHappinessComponent} from "./new-happiness/new-happiness.component";

const appRoutes: Routes = [
  { path: 'login', component: SignupComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'diary', component: DiaryPageComponent },
  { path: 'new', component: NewHappinessComponent },
  { path: 'details', component: HappyDetailsCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
