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
  private currentUser: any;
  private runFillUserNotes: Observable<void>;

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
          if (this.currentUser == null) {
            this.fillUserNotes(user).subscribe(() => {
              this.currentUser = user;
            });
            this._isLoggedIn.next(true);
          } else {
            this._isLoggedIn.next(true);
          }
        } else {
          this._isLoggedIn.next(false);
          this.currentUser = null;
        }
      }
    );
  }

  authGuardCheckUserIsLoggedIn() {
    const obsReturn = (observer, result: boolean, unsubscriberFn: Function) => {
      observer.next(result);
      unsubscriberFn();
      observer.complete();
    };
    return new Observable(observer => {
      const unSubscribeFunction: Function = firebase.auth().onAuthStateChanged(
        (user) => {
          if (user != null) {
            this.fillUserNotes(user).subscribe(() => {
              if (this.currentUser == null) {
                this.currentUser = user;
              }
              obsReturn(observer, true, unSubscribeFunction);
            });
          } else {
            obsReturn(observer, false, unSubscribeFunction);
          }
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
          this.router.navigate(['/']);
        }
      )
      .catch(
        error => {
          this.errorMessage = error.message;
        }
      );
  }

  private fillUserNotes(user) {
    if (this.runFillUserNotes != null) {
      return this.runFillUserNotes;
    }
    this.runFillUserNotes = new Observable<void>((observer) => {
      firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
        this.notesService.getNotesFromFB(snapshot.val().notes);
        this.runFillUserNotes = null;
        observer.next();
        observer.complete();
      }, (error) => {
        this.runFillUserNotes = null;
        observer.error(error);
        observer.complete();
      });
    });

    return this.runFillUserNotes;
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
    return this.currentUser.uid;
  }

  get isLoggedIn(): BehaviorSubject<boolean> {
    return this._isLoggedIn;
  }
}

