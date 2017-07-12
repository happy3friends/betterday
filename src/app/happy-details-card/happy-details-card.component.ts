import {Component, OnInit} from '@angular/core';
import {NotesService} from '../notes.service';
import {Note} from '../note';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-happy-details-card',
  templateUrl: './happy-details-card.component.html',
  styleUrls: ['./happy-details-card.component.css']
})
export class HappyDetailsCardComponent implements OnInit {
  notes: Note[];
  editNote: Note;
  editedNote: Note;
  editable: boolean;
  // note: Note;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notesService: NotesService) {
  }

  ngOnInit() {
    this.notes = this.notesService.getAddedNotes();
    const id = this.route.snapshot.params['id'];
    const editIndex = this.notes.findIndex(note => (
      this.getIdDate(id).getDate() === note.id.getDate() &&
      this.getIdDate(id).getMonth() === note.id.getMonth()
    ));
    const editedItem = this.notes[editIndex];
    this.editable = this.notesService.isEditable(editedItem);
    this.editNote = editedItem;
  }

  getIdDate(dateString: string): Date {
    const idDate = new Date();
    idDate.setMonth(+dateString.slice(0, 2) - 1);
    idDate.setDate(+dateString.slice(2, 4));
    return idDate;
  }

  onSubmit() {
    this.notesService.editNote(this.editNote);
    this.router.navigate(['/']);
  }
}
