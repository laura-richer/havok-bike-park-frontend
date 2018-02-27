import { Component, OnInit } from '@angular/core';
import { EVENTS } from '../content/mock-events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

  events = EVENTS;

  constructor() { }

  ngOnInit() {
  }

}
