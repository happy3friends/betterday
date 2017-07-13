import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';
import { DataStorageService } from './data-storage.service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotesService, DataStorageService, AlertService]
})
export class AppComponent implements OnInit {
  notes: Note[];
  isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService,
              private alertService: AlertService) {
    this.isLoggedIn$ = authService.isLoggedIn;
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

  getAuthService(): AuthService {
    return this.authService;
  }

  getAlertService(): AlertService {
    return this.alertService;
  }

}
