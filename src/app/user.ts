import { Note } from './note';

export class User {
  e_mail: string;
  daysNotes: Note[] = [];
  days = 21;
  // doing_exercise = true;
  // doing_meditation = true;
  // doing_kindness = true;
  // notes = [];

  constructor (e_mail: string) {
    this.e_mail = e_mail;

    for (let i = 0; i < this.days; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i);
      const newNote = new Note(newDate, this.doing_exercise, this.doing_meditation, this.doing_kindness);
      this.notes.push(newNote);
    }
  }

  // setNoteTypes (days: number, startDay: Date) {
  //   this.days = days;
  //   this.doing_exercise = true;
  //   this.doing_meditation = true;
  //   this.doing_kindness = true;
  //   this.startDay = startDay;
  //
  //   this.notes = [];
  //   for (let i = 0; i < days; i++) {
  //     const newNote = new Note(this.startDay, this.doing_exercise, this.doing_meditation, this.doing_kindness);
  //     this.notes.push(newNote);
  //   }
  // }
}
