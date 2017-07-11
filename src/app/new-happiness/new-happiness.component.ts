import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import { NotesService } from '../notes.service';
import { Note } from '../note';

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

  myNote = new Note(new Date(), true, true, true);

  constructor(private notesService: NotesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.myNote.setNoteData(
      form.value.gratitude1,
      form.value.gratitude2,
      form.value.gratitude3,
      (this.note.gratitude1 && this.note.gratitude2 && this.note.gratitude3) !== '',
      form.value.exercise !== '',
      form.value.meditation !== '',
      form.value.kindness !== ''
    );
    this.notesService.editNote(this.myNote);
  }
}
