import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyD633YnU0DJ4DA-V-IcbxCaLL2GAXXMjZY',
  authDomain: 'betterday-94a8e.firebaseapp.com',
  databaseURL: 'https://betterday-94a8e.firebaseio.com',
  projectId: 'betterday-94a8e',
  storageBucket: '',
  messagingSenderId: '372905412074'
};
firebase.initializeApp(config);
