import { Note } from './note';
import { current } from 'codelyzer/util/syntaxKind';

export class NotesService {

  private notes = [];
  private addedNotes = [];

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

    // this.notes[1].setNoteData(
    //   'Tudtam aludni a meleg ellenére',
    //   'Péntek van',
    //   '',
    //   true, false, true);

    this.notes[2].setNoteData(
      'A pizzafutár 20 perc alatt ideért',
      'Nem merült le a mobilom útközben',
      'Anyukám húslevest főzőtt ebédre',
      true, true, false);

    this.notes.reverse();
  }

  getNotes() {
    return this.notes.slice();
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

  isEditable(){}
}
