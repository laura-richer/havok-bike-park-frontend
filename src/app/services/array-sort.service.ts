import { Injectable } from '@angular/core';

@Injectable()
export class ArraySort {

  public eventsAll: any;
  public eventsUnordered: any;
  public currentDate;

  constructor() {
    // Setting date and formatting to work with midnight start time on FB events
    this.currentDate = new Date();
    this.currentDate = Date.parse(this.currentDate);
    this.currentDate = this.currentDate.toString();
    this.currentDate = this.currentDate.substr(0,4);
    this.currentDate = this.currentDate + '000000000';
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