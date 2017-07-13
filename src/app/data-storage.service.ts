import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NotesService } from './notes.service';
import { AuthService } from './auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private noteService: NotesService, private authService: AuthService) {}

  storeNotesToCurrentUser() {
    const token = this.authService.getToken();
    return this.http.put('https://betterday-94a8e.firebaseio.com/users.json?auth=' + token, this.noteService.notes);
  }

  // getNotes() {
  //   const token = this.authService.getToken();
  //
  //   this.http.get('https://betterday-94a8e.firebaseio.com/users.json?auth=' + token)
  //     .subscribe(
  //       (response: Response) => {
  //         const notes: Note = response.json();
  //         this.noteService.editNote(notes);
  //       }
  //     );
  // }
}
