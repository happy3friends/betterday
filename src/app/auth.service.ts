import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthService {
  token: string;
  errorMessage = '';
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    firebase.initializeApp({
      apiKey: 'AIzaSyD633YnU0DJ4DA-V-IcbxCaLL2GAXXMjZY',
      authDomain: 'betterday-94a8e.firebaseapp.com',
      databaseURL: 'https://betterday-94a8e.firebaseio.com',
      projectId: 'betterday-94a8e',
      storageBucket: 'betterday-94a8e.appspot.com'
    });

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user != null) {
          this.isLoggedIn.next(true);
        } else {
          this.isLoggedIn.next(false);
        }
      }
    );
  }

  authGuardCheckUserIsLoggedIn() {
    return new Observable(observer => {
      const unSubscribeFunction: Function = firebase.auth().onAuthStateChanged(
        (user) => {
          observer.next(user != null);
          unSubscribeFunction();
          observer.complete();
        }
      );
    });
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
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
           // const a = (snapshot.val().notes).toString();
           //  JSON.parse(a);
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
    // firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
    //    'email': firebase.auth().currentUser.email,
    //   'notes': this.notesService.getNotesJSON()
    // });

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
  }

  isAuthenticated() {
    return this.token != null;
  }
}

