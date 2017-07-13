export class Note {
  id: string;
  gratitudes = [];
  gratitudes_done = false;
  exercise_done: boolean = null;
  meditation_done: boolean = null;
  kindness_done: boolean = null;
  isAdded = false;

  constructor(data?: Note) {
    if (data != null) {
      Object.assign(this, data);
    }
  }

  setDefaultData(id: Date, doing_exercise: boolean, doing_meditation: boolean, doing_kindness: boolean) {
    this.id = '';
    this.id = this.id + ((id.getMonth() + 1) < 10 ? '0' + (id.getMonth() + 1) : id.getMonth() + 1);
    this.id = this.id + (id.getDate() < 10 ? '0' + id.getDate() : id.getDate());

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
    return this;
  }

  setNoteData(grat1: string, grat2: string, grat3: string,
              exercise_done: boolean, meditation_done: boolean, kindness_done: boolean) {
    this.gratitudes[0] = grat1;
    this.gratitudes[1] = grat2;
    this.gratitudes[2] = grat3;

    if (exercise_done) {
      this.exercise_done = true;
    }
    if (meditation_done) {
      this.meditation_done = true;
    }
    if (kindness_done) {
      this.kindness_done = true;
    }
    if ((grat1 && grat2 && grat3) !== '') {
      this.gratitudes_done = true;
    }

    this.isAdded = true;
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

  getIdDate(): Date {
    const idDate = new Date();
    idDate.setMonth(+this.id.slice(0, 2) - 1);
    idDate.setDate(+this.id.slice(2, 4));
    return idDate;
  }
  // getIdString() {
  //   let idString = '';
  //   idString = idString + ((this.id.getMonth() + 1) < 10 ? '0' + (this.id.getMonth() + 1) : this.id.getMonth() + 1);
  //   idString = idString + (this.id.getDate() < 10 ? '0' + this.id.getDate() : this.id.getDate());
  //   return idString;
  // }

  // toFirebase() {
  //   return {
  //     id: this.id.getTime(),
  //     gratitudes: this.gratitudes,
  //     gratitudes_done: this.gratitudes_done,
  //     exercise_done: this.exercise_done,
  //     meditation_done: this.meditation_done,
  //     kindness_done: this.kindness_done,
  //     isAdded: this.isAdded
  //   };
  // }
}
