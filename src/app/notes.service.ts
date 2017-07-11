import { Note } from './note';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesService {

  private dummyNotes = [];

  constructor() {
    for (let i = 0; i < 21; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i - 3);
      const newNote = new Note(newDate, true, true, true);
      this.dummyNotes.push(newNote);
    }

    this.dummyNotes[0].setNoteData(
      'Hogy fel tudtam kelni',
      'Hogy nem fogyott el a kávé',
      'Hogy felfértem a villamosra munkába menet',
      true, true, true);

    this.dummyNotes[1].setNoteData(
      'Tudtam aludni a meleg ellenére',
      'Péntek van',
      '',
      false, true, true);

    this.dummyNotes[2].setNoteData(
      'A pizzafutár 20 perc alatt ideért',
      'Nem merült le a mobilom útközben',
      'Anyukám húslevest főzőtt ebédre',
      true, false, true);
  }

  getNotes() {
    return this.dummyNotes;
  }


}
