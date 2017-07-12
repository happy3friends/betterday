import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginButtonClicked = false;

  constructor(private authService: AuthService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.loginUser(email, password);
    this.loginButtonClicked = true;

    setTimeout(() => {
      let message;
      let success;
      if (this.authService.errorMessage === '') {
        message = 'Sikeres bejelentkezés.';
        success = true;
      } else {
        message = this.authService.errorMessage;
        success = false;
      }
      this.alertService.setAlert(message, success);
    }, 500);
  }
}
