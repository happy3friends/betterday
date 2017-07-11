export class Note {
  id: Date; // new Date(year, month, day) TODO
  gratitudes = [];
  gratitudes_done = false;
  exercise_done: boolean = null;
  meditation_done: boolean = null;
  kindness_done: boolean = null;

  constructor(id: Date, doing_exercise: boolean, doing_meditation: boolean, doing_kindness: boolean ) {
    this.id = id;

    this.gratitudes[0] = '';
    this.gratitudes[1] = '';
    this.gratitudes[2] = '';

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

  setNoteData(grat1: string, grat2: string, grat3: string, exercise_done: boolean, meditation_done: boolean, kindness_done: boolean) {
    this.gratitudes[0] = grat1;
    this.gratitudes[1] = grat2;
    this.gratitudes[2] = grat3;

    if (grat3 !== '') {
      this.exercise_done = true;
    }
    if (exercise_done) {
      this.exercise_done = true;
    }
    if (meditation_done) {
      this.meditation_done = true;
    }
    if (kindness_done) {
      this.kindness_done = true;
    }
  }

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
