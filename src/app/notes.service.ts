import { Note } from './note';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesService {

  private _notes: Note[] = [];
  private _addedNotes: Note[] = [];

  constructor() {
    for (let i = 0; i < 21; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i - 5);
      const newNote = (new Note).setDefaultData(newDate, true, true, true);
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

  getNotesFromFB(notes: Note[]) {
    this._notes = [];
    notes.forEach(note => {
      console.log(note);
      this._notes.push(new Note(note));
    });
    console.log(this._notes); // TODO
  }

  saveNotesToFB(userId: string) {
    firebase.database().ref('users/' + userId).set({
      'notes': this._notes
    });
  }

  editNote(editNote: Note) {
    const today = new Date();
    const editIndex = this._notes.findIndex(note => note.getIdDate().getDate() === today.getDate() && note.getIdDate().getMonth() === today.getMonth());
    this._notes[editIndex] = editNote;
  }

  isEditable(note: Note): boolean {
    const today = new Date();
    return today.getDate() === note.getIdDate().getDate() && today.getMonth() === note.getIdDate().getMonth();
  }

}
