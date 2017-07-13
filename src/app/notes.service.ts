import { Note } from './note';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class NotesService {

  private _notes: Note[] = [];
  private _addedNotes: Note[] = [];

  constructor(private authService: AuthService) {
    for (let i = 0; i < 21; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i - 5);
      const newNote = new Note(newDate, true, true, true);
      this._notes.push(newNote);
    }

    this._notes[0].setNoteData(
      'Hogy fel tudtam kelni',
      'Hogy nem fogyott el a kávé',
      'Hogy felfértem a villamosra munkába menet',
      true, true, true);

    this._notes[1].setNoteData(
      'Tudtam aludni a meleg ellenére',
      'Péntek van',
      '',
      true, true, true);

    this._notes[3].setNoteData(
      'A pizzafutár 20 perc alatt ideért',
      'Nem merült le a mobilom útközben',
      'Anyukám húslevest főzőtt ebédre',
      false, true, false);

    this._notes[4].setNoteData(
      '',
      '',
      '',
      false, false, true);

    this._notes.reverse();
  }

  get notes(): Note[] {
    return this._notes;
  }


  get addedNotes(): Note[] {
    this._addedNotes = [];
    this._notes.forEach(note => {
      if (note.isAdded) {
        this._addedNotes.push(note);
      }
    });
    return this._addedNotes;
  }

  getNotesFromFB(notesPromise: Promise<string[]>) {
    notesPromise.then(notes => {
      notes.forEach(note => {
        console.log('id: ' + JSON.parse(note).id);
      })
    });
  }

  saveNotesToFB() {
    const jsonNotes = [];
    this._notes.forEach(note => {
      jsonNotes.push(JSON.stringify(note))
    });
    firebase.database().ref('users/' + this.authService.getUserId()).set({
      'notes': jsonNotes
    });
  }

  editNote(editNote: Note) {
    const today = new Date();
    const editIndex = this._notes.findIndex(note => note.id.getDate() === today.getDate() && note.id.getMonth() === today.getMonth());
    this._notes[editIndex] = editNote;
  }

  isEditable(note: Note): boolean {
    const today = new Date();
    return today.getDate() === note.id.getDate() && today.getMonth() === note.id.getMonth();
  }

}
