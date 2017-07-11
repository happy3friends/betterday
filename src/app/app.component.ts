import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NotesService } from './notes.service';
import { Note } from './note';
import { DataStorageService } from './data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotesService, DataStorageService]
})
export class AppComponent implements OnInit {
  title = 'Better Day app';
  notes: Note[];

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD633YnU0DJ4DA-V-IcbxCaLL2GAXXMjZY',
      authDomain: 'betterday-94a8e.firebaseapp.com',
      databaseURL: 'https://betterday-94a8e.firebaseio.com',
      projectId: 'betterday-94a8e',
      storageBucket: 'betterday-94a8e.appspot.com'
    });
  }


}
