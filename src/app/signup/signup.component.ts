import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';
import { AlertService } from '../alert.service';

@Injectable()
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
    firebase.database().ref('users/').push({
      email,
      'notes': this.notesService.getNotes()
    });
  }
}
