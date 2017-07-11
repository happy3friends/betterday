import { Component, OnInit } from '@angular/core';
import {NotesService} from "../notes.service";
import {Note} from "../note";

@Component({
  selector: 'app-happy-details-card',
  templateUrl: './happy-details-card.component.html',
  styleUrls: ['./happy-details-card.component.css']
})
export class HappyDetailsCardComponent implements OnInit {
  editable: boolean;

  constructor() { }

  ngOnInit() {
  }

  isEditable(note: Note) {
    const today = new Date();
    this.editable = (note.id.getDate() === today.getDate() && note.id.getMonth() === today.getMonth());
  }
}
