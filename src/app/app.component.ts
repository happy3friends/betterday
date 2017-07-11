import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Better Day app';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD633YnU0DJ4DA-V-IcbxCaLL2GAXXMjZY',
      authDomain: 'betterday-94a8e.firebaseapp.com'
    });
  }
}
