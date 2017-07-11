import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {DiaryPageComponent} from "./diary-page/diary-page.component";
import {HappyDetailsCardComponent} from "./happy-details-card/happy-details-card.component";
import {HomePageComponent} from "./home-page/home-page.component";
import { SignupComponent } from 'app/signup/signup.component';

const appRoutes: Routes = [
  { path: 'login', component: SignupComponent }
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },

  { path: 'diary', component: DiaryPageComponent },
  { path: 'details', component: HappyDetailsCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
