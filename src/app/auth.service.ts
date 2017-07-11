import * as firebase from 'firebase';

export class AuthService {
  token: string;
  errorMessage = '';

  signupUser(email: string, password: string) {
    this.errorMessage = '';
    firebase.auth().createUserWithEmailAndPassword(email, password)
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
    firebase.auth().signOut();
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

