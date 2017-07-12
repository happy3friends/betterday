import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';

@Injectable()
export class AuthService {
  token: string;
  errorMessage = '';

  constructor(private router: Router, private notesService: NotesService) {
  }

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
          console.log(firebase.auth().currentUser.email);
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
           const a = (snapshot.val().notes).toString();
            JSON.parse(a);
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
    console.log(this.notesService.getNotesJSON());
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
       'email': firebase.auth().currentUser.email,
      'notes': this.notesService.getNotesJSON()
    });

    firebase.auth().signOut()
      .then(
        (response) => {
          this.router.navigate(['/login']);
        }
      );
    this.token = null;
  }

  getUserId() {
    return firebase.auth().currentUser.uid;
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

