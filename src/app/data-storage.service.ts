import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NotesService } from './notes.service';
import { Note } from './note';
import { AuthService } from './auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private noteService: NotesService, private authService: AuthService) {}

}
