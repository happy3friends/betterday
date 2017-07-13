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

  email = 'teszt@teszt.hu';
  password = 'teszt123';

  constructor(private authService: AuthService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.loginUser(email, password).then(notesPromise => {
      if (this.authService.errorMessage !== '') {
        const message = this.authService.errorMessage;
        const success = false;
        this.alertService.setAlert(message, success);
      }
    });
    this.loginButtonClicked = true;

  }
}
