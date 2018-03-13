import { Injectable } from '@angular/core';

@Injectable()
export class ArraySort {

  public eventsAll: any;
  public eventsUnordered: any;
  public currentDate;

  constructor() {
    this.currentDate = new Date();
    this.currentDate = Date.parse(this.currentDate);
  }

  removePastDates(object) {
    this.eventsAll = object;

    // Remove past events
    for (var i = object.length - 1; i >= 0; --i) {
      if ( Date.parse(object[i].start_time) < this.currentDate) {
        this.eventsAll.splice(i,1);
      }
    }
  }
}