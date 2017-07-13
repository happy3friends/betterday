import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private notesService: NotesService) { }

  ngOnInit() {
  }

  onSingup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password).then(
      () => {
        this.notesService.saveNotesToFB();
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
      }
    );

  }
}
