import { Note } from './note';
import { current } from 'codelyzer/util/syntaxKind';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesService {

  private notes: Note[] = [];
  private addedNotes = [];

  constructor() {
    for (let i = 0; i < 21; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i);
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
      true, true, true);

    this.notes[3].setNoteData(
      'A pizzafutár 20 perc alatt ideért',
      'Nem merült le a mobilom útközben',
      'Anyukám húslevest főzőtt ebédre',
      false, true, false);

    this.notes[4].setNoteData(
      '',
      '',
      '',
      false, false, true);
    
    this.notes.reverse();
  }

  getNotes() {
    return this.notes.slice();
  }

  getNotesJSON() {
    const myNotes = [];
    this.getNotes().forEach(note => {
      myNotes.push(JSON.stringify(note))
    });
    console.log(myNotes);
    return myNotes;
    // console.log(testDate);
    // const myDate = new Date(testDate);
    // console.log(myDate);
  }

  setNotes(notes: string[]) {
    console.log('aa');
    notes.forEach(note => {
      console.log('id: ' + JSON.parse(note).id);
    });
  }

  getAddedNotes() {
    this.addedNotes = [];

    this.notes.forEach(note => {
      if (note.isAdded) {
        this.addedNotes.push(note);
      }
    });

    return this.addedNotes.slice();
  }


  editNote(editNote: Note) {
    const today = new Date();
    const editIndex = this.notes.findIndex(note => note.id.getDate() === today.getDate() && note.id.getMonth() === today.getMonth());
    this.notes[editIndex] = editNote;
  }

  isEditable(note: Note): boolean {
    const today = new Date();
    return today.getDate() === note.id.getDate() && today.getMonth() === note.id.getMonth();
  }

}
