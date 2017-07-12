import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  errorMessage = '';

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    this.errorMessage = '';
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (response) => {
          alert('Jelentkezz be');
          this.router.navigate(['/login']);
        }
      )
      .catch(
        error => {
          console.log(error);
          this.errorMessage = error.message;
        }
      )
  }

  loginUser(email: string, password: string) {
    this.errorMessage = '';
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
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

