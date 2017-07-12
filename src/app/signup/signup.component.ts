import { Component, Injectable, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../alert.service';

@Injectable()
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
    firebase.database().ref('users/').push({
      email
    });

    setTimeout(() => {
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
    }, 500);

  }
}
