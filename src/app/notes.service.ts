import { Note } from './note';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesService {

  private notes = [];

  constructor() {
    for (let i = 0; i < 21; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i - 3);
      const newNote = new Note(newDate, true, true, true);
      this.notes.push(newNote);
    }

    this.notes[0].setNoteData(
      'Hogy fel tudtam kelni',
      'Hogy nem fogyott el a kávé',
      'Hogy felfértem a villamosra munkába menet',
      true, true, true);

    this.notes[1].setNoteData(
      'Tudtam aludni a meleg ellenére',
      'Péntek van',
      '',
      false, true, true);

    this.notes[2].setNoteData(
      'A pizzafutár 20 perc alatt ideért',
      'Nem merült le a mobilom útközben',
      'Anyukám húslevest főzőtt ebédre',
      true, false, true);
  }

  getNotes() {
    return this.notes.slice();
  }


  editNote(editNote: Note) {
    const today = new Date();
    const editIndex = this.notes.findIndex(note => note.id.getDate() === today.getDate() && note.id.getMonth() === today.getMonth());
    this.notes[editIndex] = editNote;
  }


}
