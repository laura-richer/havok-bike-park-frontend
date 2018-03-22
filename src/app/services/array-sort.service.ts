import { Injectable } from '@angular/core';

@Injectable()
export class ArraySort {

  public eventsAll: any;
  public eventsUnordered: any;
  public currentDate;
  public newDate;

  constructor() {
    // Setting date and formatting to work with midnight start time on FB events
    this.currentDate = new Date();
    this.currentDate = Date.parse(this.currentDate);
  }

  removePastDates(object) {
    this.eventsAll = object;

    // Remove past events
    for (var i = object.length - 1; i >= 0; --i) {
      this.parseDate(object[i].start_time);

      if ( Date.parse(this.newDate) < this.currentDate) {
        this.eventsAll.splice(i,1);
      }
    }
  }

  // format iso date to be usable with Date.parse
  parseDate(input) {
    var dt = input.split(/[: T-]/).map(parseFloat);
    this.newDate = new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
  }
}