import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { DataStorageService } from '../data-storage.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-happiness',
  templateUrl: './new-happiness.component.html',
  styleUrls: ['./new-happiness.component.css']
})
export class NewHappinessComponent implements OnInit {
  myNote = new Note(new Date(), true, true, true);

  constructor(private notesService: NotesService,
              private dataStorageService: DataStorageService,
              private router: Router) { }

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

    this.router.navigate(['/']);
  }

}
