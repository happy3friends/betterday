import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiaryPageComponent} from './diary-page/diary-page.component';
import {HappyDetailsCardComponent} from './happy-details-card/happy-details-card.component';
import {HomePageComponent} from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from 'app/signup/signup.component';
import {NewHappinessComponent} from './new-happiness/new-happiness.component';
import { AuthGuard } from './auth-guard.service';
import {AboutComponent} from './about/about.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'diary', component: DiaryPageComponent, canActivate: [AuthGuard] },
  { path: 'new', component: NewHappinessComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: HappyDetailsCardComponent, canActivate: [AuthGuard] },
  // { path: '**', redirectTo: '/about'}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
