import { Note } from './note';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesService {

  private _notes: Note[] = [];
  private _addedNotes: Note[] = [];

  constructor() {
    this.initNewNotesArray();
  }

  private initNewNotesArray() {
    for (let i = 0; i < 21; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i);
      const newNote = (new Note).setDefaultData(newDate, true, true, true);
      this._notes.push(newNote);
    }
  }

  get notes(): Note[] {
    this._notes.sort((prev, current) => prev.id < current.id ? -1 : 1);
    return this._notes;
  }

  get addedNotes(): Note[] {
    this._addedNotes = [];
    this._notes.forEach(note => {
      if (note.isAdded) {
        this._addedNotes.push(note);
      }
    });
    this._addedNotes.sort((prev, current) => prev.id < current.id ? 1 : -1);
    return this._addedNotes;
  }

  getNotesFromFB(notes: Note[]) {
    this._notes = [];
    notes.forEach(note => {
      this._notes.push(new Note(note));
    });
  }

  saveNotesToFB(userId: string, isNew = false) {
    if (isNew) {
      this._notes = [];
      this.initNewNotesArray();
    }
    return firebase.database().ref('users/' + userId).set({
      'notes': this._notes
    });
  }

  editNote(editNote: Note) {
    const today = new Date();
    const editIndex = this._notes.findIndex(
      note => note.getIdDate().getDate() === today.getDate() && note.getIdDate().getMonth() === today.getMonth());
    this._notes[editIndex] = editNote;
  }

  isEditable(note: Note): boolean {
    const today = new Date();
    return today.getDate() === note.getIdDate().getDate() && today.getMonth() === note.getIdDate().getMonth();
  }

  getTodayNoteIndex(): number {
    const today = new Date();
    const editIndex = this._notes.findIndex(
      note => note.getIdDate().getDate() === today.getDate() && note.getIdDate().getMonth() === today.getMonth());
    return editIndex;
  }

}
