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
    this.events = object.data;

    // Remove past events
    for (var i = object.data.length - 1; i >= 0; --i) {
      if ( Date.parse(object.data[i].start_time) < this.currentDate) {
        this.events.splice(i,1);
      }
    }

    return this.events.sort(this.sortNumber);
  }

  // Sort array by date
  sortNumber(a, b) {
    return Date.parse(a.start_time) - Date.parse(b.start_time);
  }
}