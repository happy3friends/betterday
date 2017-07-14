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
  private _currentUser: any;
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
        // console.log('constructor');
        if (user != null) {
          if (this._currentUser == null) {
            // ha nincs tarolva jelenlegi user akkor feltoltjuk a feltoltjuk a note-kat
            // TODO hiba agat kezelni!!!
            this.fillUserNotes(user).subscribe(() => {
              // miutan feltolttuk a user-t taroljuk
              this._currentUser = user;
            });
            // jelzunk hogy be van lepve
            this._isLoggedIn.next(true);
          } else {
            // ha van tarolva belepett user akkor csak jelzunk hogy belepett (auth guard hivas miatt kell)
            this._isLoggedIn.next(true);
          }
        } else {
          // nincs belepve vagy kilepett ezert jelzunk + currentUser-t toroljuk
          this._isLoggedIn.next(false);
          this._currentUser = null;
        }
      }
    );
  }

  authGuardCheckUserIsLoggedIn() {
    // console.log('authGuardCheckUserIsLoggedIn');
    // observer visszahivasi metodus(csak azert mert ismetlodik es is szebb es tomorebb a kod
    const obsReturn = (observer, result: boolean, unsubscriberFn: Function) => {
      observer.next(result);
      unsubscriberFn();
      observer.complete();
    };
    return new Observable(observer => {
      const unSubscribeFunction: Function = firebase.auth().onAuthStateChanged(
        (user) => {
          if (user != null) {
            // ha belepett userrel val dolgunk, akkor kitoltjuk az note-kat
            // TODO hiba agat kezelni!!!
            this.fillUserNotes(user).subscribe(() => {
              if (this._currentUser == null) {
                // ha nincs tarolva jelenlegi user akkor taroljuk
                this._currentUser = user;
              }
              // jelzunk a router-nek hogy mehet tovabb
              obsReturn(observer, true, unSubscribeFunction);
            });
          } else {
            // nincs belepve ezert jelzunk a routernak hogy nem mehet tovabb
            obsReturn(observer, false, unSubscribeFunction);
          }
        }
      );
    });
  }

  signupUser(email: string, password: string) {
    this.errorMessage = '';
    const errorFn = (observer, error) => {
      this.errorMessage = error.message;
      observer.error(error);
      observer.complete();
    };
    return new Observable<void>(observer => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          (response) => {
            // this.notesService.saveNotesToFB(this.getUserId());
            observer.next();
            observer.complete();
            this.router.navigate(['/']);
          },
          errorFn.bind(this, observer)
        )
        .catch(errorFn.bind(this, observer));
    });
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

  // azert kell a stream mert refreshnel az authguard elobb hivodik meg ...
  // viszont sima belepesnel meg a constructorban levo vizsgalat fut meg hamarabb ...
  // mivel stream-be zarjuk es a stream-et elrakjuk igy mind1 hogy authguard felol vagy constructor felol jon a feltoltes,
  // mindenki ugyan azt a stream-et kapja vissza ha van eppen futo lekerdezes
  fillUserNotes(user) {
    if (this.runFillUserNotes != null) {
      // ha futo stream van akkor vissza adjuk a futo streamet
      return this.runFillUserNotes;
    }
    this.runFillUserNotes = new Observable<void>((observer) => {
      // keszitunk egy stream-et amit az adatkuldes utan le is zarunk ...
      firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
        const completeFn = (_observer) => {
          // toroljuk a stream-et tarolo osztalyvaltozot...
          this.runFillUserNotes = null;
          _observer.next();
          _observer.complete();
        };
        if (snapshot.val() == null || snapshot.val()['notes'] == null) {
          // TODO hiba agat kezelni!!!
          this.notesService.saveNotesToFB(user.uid, true).then(
            () => completeFn(observer)
          );
        } else {
          this.notesService.getNotesFromFB(snapshot.val().notes);
          completeFn(observer);
        }
      }, (error) => {
        // hibakezeles (ha fb hibat dob)
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
    return this._currentUser.uid;
  }

  get currentUser(): any {
    return this._currentUser;
  }

  get isLoggedIn(): BehaviorSubject<boolean> {
    return this._isLoggedIn;
  }
}

