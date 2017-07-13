import {Component, OnInit} from '@angular/core';
import {NotesService} from '../notes.service';
import {Note} from '../note';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-happy-details-card',
  templateUrl: './happy-details-card.component.html',
  styleUrls: ['./happy-details-card.component.css']
})
export class HappyDetailsCardComponent implements OnInit {
  editNote: Note;
  editable: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notesService: NotesService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const editIndex = this.notesService.addedNotes.findIndex(note => (
      this.getIdDate(id).getDate() === note.id.getDate() &&
      this.getIdDate(id).getMonth() === note.id.getMonth()
    ));
    this.editNote = this.notesService.addedNotes[editIndex];
    this.editable = this.notesService.isEditable(this.editNote);
  }

  getIdDate(dateString: string): Date {
    const idDate = new Date();
    idDate.setMonth(+dateString.slice(0, 2) - 1);
    idDate.setDate(+dateString.slice(2, 4));
    return idDate;
  }

  onSubmit() {
    this.notesService.editNote(this.editNote);
    this.notesService.saveNotesToFB();
    this.router.navigate(['/']);
  }
}
