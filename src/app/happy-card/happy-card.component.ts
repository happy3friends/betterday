import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-happy-card',
  templateUrl: './happy-card.component.html',
  styleUrls: ['./happy-card.component.css']
})
export class HappyCardComponent implements OnInit {
  @Input() note: Note;
  today = new Date();

  constructor() { }

  ngOnInit() {
  }

}
