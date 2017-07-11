export class Note {
  id: Date; // new Date(year, month, day) TODO
  gratitudes_done = false;
  exercise_done = false;
  meditation_done = false;
  kindness_done = false;

  constructor(id: Date, doing_exercise: boolean, doing_meditation: boolean, doing_kindness: boolean ) {
    this.id = id;
    if (doing_exercise) {
      this.exercise_done = false;
    }
    if (doing_meditation) {
      this.meditation_done = false;
    }
    if (doing_kindness) {
     this.kindness_done = false;
    }
  }

  setNoteData() {}

  getDailySuccess(): number {
    let success = 0;
    if (this.gratitudes_done) {
      success++;
    }
    if (this.exercise_done) {
      success++;
    }
    if (this.meditation_done) {
      success++;
    }
    if (this.kindness_done) {
      success++;
    }
    return success;
  }
}
