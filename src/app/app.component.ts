import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  notes: Note[];
  isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private notesService: NotesService) {
    this.isLoggedIn$ = authService.isLoggedIn;
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

  getNotesService(): NotesService {
    return this.notesService;
  }

  getAlertService(): AlertService {
    return this.alertService;
  }

}
