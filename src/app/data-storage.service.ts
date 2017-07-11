import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NotesService } from './notes.service';
import { Note } from './note';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private noteService: NotesService) {}

  storeNotes() {
    return this.http.put('https://betterday-94a8e.firebaseio.com/notes.json', this.noteService.getNotes());
  }

  // getNotes() {
  //   this.http.get('https://betterday-94a8e.firebaseio.com/notes.json')
  //     .subscribe(
  //       (response: Response) => {
  //         const notes: Note = response.json();
  //         this.noteService.editNote(notes);
  //       }
  //     );
  // }
}
