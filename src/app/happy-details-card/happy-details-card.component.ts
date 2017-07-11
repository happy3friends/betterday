import { Component, OnInit } from '@angular/core';
import {NotesService} from "../notes.service";
import {Note} from "../note";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-happy-details-card',
  templateUrl: './happy-details-card.component.html',
  styleUrls: ['./happy-details-card.component.css']
})
export class HappyDetailsCardComponent implements OnInit {
  notes: Note[];
  editNote: Note;
  editable: boolean;
  // note: Note;

  constructor(private route: ActivatedRoute, private notesService: NotesService) { }

  ngOnInit() {
    this.notes = this.notesService.getAddedNotes();
    const id = this.route.snapshot.params['id'];
    const editIndex = this.notes.findIndex(note => this.getIdDate(id).getDate() === note.id.getDate() && this.getIdDate(id).getMonth() === note.id.getMonth());
    this.editNote = this.notes[editIndex];
    this.editable = this.notesService.isEditable(this.editNote);
  }

  getIdDate(dateString: string): Date {
    const idDate = new Date();
    idDate.setMonth(+dateString.slice(0, 2) - 1);
    idDate.setDate(+dateString.slice(2, 4));
    return idDate;
  }
}
