import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../notes.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  allNotes: Note[];
  notes: Note[];

  lastNotesIndexes = [0, 1, 2];

  constructor(private notesService: NotesService, private router: Router) { }

  ngOnInit() {
    this.notes = this.notesService.getAddedNotes();
    this.allNotes = this.notesService.getNotes().reverse();
  }

  onLoadEdit() {
    this.router.navigate('');
  }
}
