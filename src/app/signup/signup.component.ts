import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';

@Injectable()
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  regButtonClicked = false;

  constructor(private authService: AuthService,
              private notesService: NotesService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
    firebase.database().ref('users/').push({
      email,
      'notes': this.notesService.getNotes()
    });
    this.regButtonClicked = true;
  }
}
