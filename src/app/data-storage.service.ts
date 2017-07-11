import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NotesService } from './notes.service';
import { Note } from './note';
import { AuthService } from './auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private noteService: NotesService, private authService: AuthService) {}

  storeNotes() {
    const token = this.authService.getToken();
    return this.http.put('https://betterday-94a8e.firebaseio.com/users.json?auth=' + token, this.noteService.getNotes());
  }

  getNotes() {
    const token = this.authService.getToken();

    this.http.get('https://betterday-94a8e.firebaseio.com/users.json?auth=' + token)
      .subscribe(
        (response: Response) => {
          const notes: Note = response.json();
          this.noteService.editNote(notes);
        }
      );
  }
}
