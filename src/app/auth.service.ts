import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';

@Injectable()
export class AuthService {
  token: string;
  errorMessage = '';

  constructor(private router: Router, private notesService: NotesService) {}

  signupUser(email: string, password: string) {
    this.errorMessage = '';
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (response) => {
          this.router.navigate(['/login']);
        }
      )
      .catch(
        error => {
          console.log(error);
          this.errorMessage = error.message;
        }
      );
  }

  loginUser(email: string, password: string) {
    this.errorMessage = '';
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
            console.log(firebase.auth().currentUser.uid);

            console.log(snapshot.val()[1]);
            let n: Note[];
            n = snapshot.val().notes;
            console.log(n[0]);
            this.notesService.setNotes(n);
          });
        }
      )
      .catch(
        error => {
          console.log(error);
          this.errorMessage = error.message;
        }
      );
  }

  logout() {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
      'notes': this.notesService.getNotes()});

    firebase.auth().signOut()
      .then(
        (response) => {
          this.router.navigate(['/login']);
        }
      );
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}

