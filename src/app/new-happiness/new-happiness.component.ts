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
  myNote = new Note(new Date(), true, true, true);

  constructor(private notesService: NotesService) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    this.myNote.setNoteData(
      form.value.gratitude1,
      form.value.gratitude2,
      form.value.gratitude3,
      form.value.exercise !== '',
      form.value.meditation !== '',
      form.value.kindness !== ''
    );
    this.notesService.editNote(this.myNote);
  }
}
