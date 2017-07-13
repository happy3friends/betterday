import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-new-happiness',
  templateUrl: './new-happiness.component.html',
  styleUrls: ['./new-happiness.component.css']
})
export class NewHappinessComponent implements OnInit {
  myNote = (new Note).setDefaultData(new Date(), true, true, true);

  constructor(
    private notesService: NotesService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    const alertObserver = this.alertService.setAlert('Mentés folyamatban...', true, 0, 10000);
    this.myNote.setNoteData(
      form.value.gratitude1,
      form.value.gratitude2,
      form.value.gratitude3,
      form.value.exercise !== '',
      form.value.meditation !== '',
      form.value.kindness !== ''
    );
    this.notesService.editNote(this.myNote);
    this.notesService.saveNotesToFB(this.authService.getUserId()).then(() => {
      this.authService.fillUserNotes(this.authService.currentUser).subscribe(() => {
        alertObserver.next(false);
        this.alertService.setAlert('Sikeres mentés', true, 0, 3000);
        this.router.navigate(['/']);
      });
    }, (error) => {
      this.alertService.setAlert('Hiba a mentés közben', false)
    });
  }

}
