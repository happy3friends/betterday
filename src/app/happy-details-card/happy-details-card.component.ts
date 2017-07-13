import {Component, OnInit} from '@angular/core';
import {NotesService} from '../notes.service';
import {Note} from '../note';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../auth.service';

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
              private notesService: NotesService,
              private authService: AuthService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const editIndex = this.notesService.addedNotes.findIndex(note => (
      note.id === id
    ));
    this.editNote = this.notesService.addedNotes[editIndex];
    this.editable = this.notesService.isEditable(this.editNote);
  }

  onSubmit() {
    this.notesService.editNote(this.editNote);
    this.notesService.saveNotesToFB(this.authService.getUserId());
    this.router.navigate(['/']);
  }
}
