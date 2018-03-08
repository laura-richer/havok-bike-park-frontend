import { Injectable } from '@angular/core';

@Injectable()
export class ArraySort {

  public events: any;
  public currentDate;

  constructor() {
    this.currentDate = new Date();
    this.currentDate = Date.parse(this.currentDate);
  }

  sortByDate(object) {
    this.events = object;

    // Remove past events
    for (var i = object.length - 1; i >= 0; --i) {
      if ( Date.parse(object[i].acf.event_date) < this.currentDate) {
        this.events.splice(i,1);
      }
    }

    return this.events.sort(this.sortNumber);
  }

  // Sort array by date
  sortNumber(a, b) {
    return Date.parse(a.acf.event_date) - Date.parse(b.acf.event_date);
  }
}