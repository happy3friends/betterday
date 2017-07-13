import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NotesService } from './notes.service';

@Injectable()
export class AuthService {
  errorMessage = '';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private notesService: NotesService) {
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
          this._isLoggedIn.next(true);
        } else {
          this._isLoggedIn.next(false);
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
          this.notesService.saveNotesToFB(this.getUserId());
          this.router.navigate(['/login']);
        }
      )
      .catch(
        error => {
          this.errorMessage = error.message;
        }
      );
  }

  loginUser(email: string, password: string) {
    this.errorMessage = '';
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then((snapshot) => {
            this.notesService.getNotesFromFB(snapshot.val().notes);
          });
          this.router.navigate(['/']);
        }
      )
      .catch(
        error => {
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
  }

  getUserId() {
    return firebase.auth().currentUser.uid;
  }

  get isLoggedIn(): BehaviorSubject<boolean> {
    return this._isLoggedIn;
  }
}

