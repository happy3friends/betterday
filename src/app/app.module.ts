import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DiaryPageComponent } from './diary-page/diary-page.component';
import { HappyCardComponent } from './happy-card/happy-card.component';
import { HappyDetailsCardComponent } from './happy-details-card/happy-details-card.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DiaryPageComponent,
    HappyCardComponent,
    HappyDetailsCardComponent,
    LoginComponent,
    SettingsComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
