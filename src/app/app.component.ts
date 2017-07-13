import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';
import { DataStorageService } from './data-storage.service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotesService, DataStorageService, AlertService]
})
export class AppComponent implements OnInit {
  notes: Note[];

  constructor(private authService: AuthService,
              private alertService: AlertService) { }

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
