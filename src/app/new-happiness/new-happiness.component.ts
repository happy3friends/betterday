import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-happiness',
  templateUrl: './new-happiness.component.html',
  styleUrls: ['./new-happiness.component.css']
})
export class NewHappinessComponent implements OnInit {
  note = {
    gratitude1: '',
    gratitude2: '',
    gratitude3: '',
    gratitudes_done: false,
    exercise_done: false,
    meditation_done: false,
    kindness_done: false,
    date: new Date()
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.note.gratitude1 = form.value.gratitude1;
    this.note.gratitude2 = form.value.gratitude2;
    this.note.gratitude3 = form.value.gratitude3;
    this.note.gratitudes_done = (this.note.gratitude1 && this.note.gratitude2 && this.note.gratitude3) !== '';
    this.note.exercise_done = form.value.exercise !== '';
    this.note.meditation_done = form.value.meditation !== '';
    this.note.kindness_done = form.value.kindness !== '';
    this.note.date = new Date();
    console.log(this.note);
  }
}
