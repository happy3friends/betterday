import { Note } from './note';

export class User {
  e_mail: string;
  days: number;
  startDay: Date;
  doing_exercise = false;
  doing_meditation = false;
  doing_kindness = false;
  notes: Note[];

  constructor (e_mail: string) {
    this.e_mail = e_mail;
    this.startDay = new Date();

    for (let i = 0; i < this.days; i++) {
      const newNote = new Note(this.startDay, this.doing_exercise, this.doing_meditation, this.doing_kindness);
      this.notes.push(newNote);
    }
  }

  setNoteTypes (days: number, startDay: Date) {
    this.days = days;
    this.doing_exercise = true;
    this.doing_meditation = true;
    this.doing_kindness = true;
    this.startDay = startDay;

    this.notes = [];
    for (let i = 0; i < days; i++) {
      const newNote = new Note(this.startDay, this.doing_exercise, this.doing_meditation, this.doing_kindness);
      this.notes.push(newNote);
    }
  }

  editNote(editNote: Note) {
    const editIndex = this.notes.findIndex(note => note.id === editNote.id);
    this.notes[editIndex] = editNote;
  }
}
