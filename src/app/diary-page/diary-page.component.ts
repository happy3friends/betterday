import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-diary-page',
  templateUrl: './diary-page.component.html',
  styleUrls: ['./diary-page.component.css']
})
export class DiaryPageComponent implements OnInit {
  notes: Note[];

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notes = this.notesService.getAddedNotes();
  }

}
