import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onSingup(form: NgForm, valid: boolean) {
    if (!valid) {
      return this.alertService.setAlert('Regisztrációhoz kötelező az összes mező kitöltése!', false);
    }
    const alertObserver = this.alertService.setAlert('Regisztráció folyamatban', true);
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password).subscribe(
      () => {
        alertObserver.next(false);
        let message;
        let success;
        if (this.authService.errorMessage === '') {
          message = 'Sikeres regisztráció, most már bejelentkezhet.';
          success = true;
        } else {
          message = this.authService.errorMessage;
          success = false;
        }
        this.alertService.setAlert(message, success);
      }, (error) => {
        this.alertService.setAlert(this.authService.errorMessage, false);
      });

  }
}
