import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-diary-page',
  templateUrl: './diary-page.component.html',
  styleUrls: ['./diary-page.component.css']
})
export class DiaryPageComponent implements OnInit {
  addedNotes: Note[];

  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.addedNotes = this.notesService.addedNotes;
  }

}
